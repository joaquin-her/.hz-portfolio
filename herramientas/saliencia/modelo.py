"""
Carga de DeepGaze IIE y calculo del mapa de saliencia.

DeepGaze IIE (Linardos et al., 2021) predice donde cae la mirada en los
primeros instantes de ver una imagen. Esta entrenado con datos reales de
eye-tracking (MIT1003/SALICON), asi que no es una heuristica de contraste:
es el mismo tipo de modelo que hay detras de varias herramientas
comerciales de "attention heatmap".

Todo corre local. Ninguna imagen sale de la maquina.

Que mide y que no
-----------------
Predice saliencia *bottom-up*: que atrae el ojo por contraste, tamaño,
caras, texto y posicion, en una primera mirada sin tarea asignada. No sabe
nada de intencion: alguien que entro decidido a escribirte va a buscar el
formulario aunque el mapa no lo marque. Sirve para comparar variantes de
un mismo diseño, no como prueba de conversion.
"""

from __future__ import annotations

import sys
import types
from functools import lru_cache

import numpy as np
import torch
from PIL import Image
from scipy.ndimage import zoom


def _neutralizar_clip() -> None:
    """
    El ``__init__`` del paquete importa modelos que dependen de CLIP, que
    solo se instala desde GitHub. DeepGaze IIE no lo usa, asi que se
    registra un modulo vacio antes de importar y se evita esa dependencia.
    """
    if "clip" in sys.modules:
        return
    stub = types.ModuleType("clip")
    stub.load = lambda *a, **k: None
    stub.available_models = lambda: []
    sys.modules["clip"] = stub


@lru_cache(maxsize=1)
def cargar_modelo(dispositivo: str | None = None):
    """
    Devuelve el modelo listo para inferir, y el dispositivo donde vive.

    Se cachea: cargar los pesos cuesta unos segundos y no hace falta
    repetirlo por cada imagen de un lote.
    """
    _neutralizar_clip()
    from deepgaze_pytorch.deepgaze2e import DeepGazeIIE

    if dispositivo is None:
        dispositivo = "cuda" if torch.cuda.is_available() else "cpu"

    modelo = DeepGazeIIE(pretrained=True).to(dispositivo).eval()
    return modelo, dispositivo


def _sesgo_central(alto: int, ancho: int) -> np.ndarray:
    """
    Prior de centro, en escala logaritmica.

    El modelo espera un mapa de partida que represente la tendencia a mirar
    al centro de la imagen —un sesgo bien documentado en eye-tracking—.
    Una gaussiana ancha alcanza: el modelo la corrige con el contenido.
    """
    y = np.linspace(-1, 1, alto)[:, None]
    x = np.linspace(-1, 1, ancho)[None, :]
    g = np.exp(-((x ** 2 + y ** 2) / (2 * 0.45 ** 2)))
    g /= g.sum()
    return np.log(g + 1e-12)


def mapa_de_saliencia(
    ruta_imagen: str,
    dispositivo: str | None = None,
    lado_maximo: int = 1024,
) -> np.ndarray:
    """
    Calcula el mapa de atencion de una imagen.

    Devuelve un array float32 del alto y ancho originales, normalizado a
    [0, 1], donde 1 es el punto que mas atrae la mirada.

    ``lado_maximo`` acota el lado mayor antes de inferir: una captura de
    pagina completa puede tener varios miles de pixeles de alto y no entra
    en memoria de GPU. El mapa se devuelve reescalado al tamaño original.
    """
    modelo, dispositivo = cargar_modelo(dispositivo)

    imagen = Image.open(ruta_imagen).convert("RGB")
    ancho_orig, alto_orig = imagen.size

    escala = min(1.0, lado_maximo / max(ancho_orig, alto_orig))
    if escala < 1.0:
        imagen = imagen.resize(
            (max(1, int(ancho_orig * escala)), max(1, int(alto_orig * escala))),
            Image.LANCZOS,
        )

    arr = np.array(imagen)
    alto, ancho = arr.shape[:2]

    tensor = torch.tensor(arr.transpose(2, 0, 1)[None].astype(np.float32)).to(dispositivo)
    centro = torch.tensor(_sesgo_central(alto, ancho)[None].astype(np.float32)).to(dispositivo)

    with torch.no_grad():
        # El modelo devuelve densidad en log; exp() la vuelve a probabilidad.
        prediccion = modelo(tensor, centro)
        mapa = torch.exp(prediccion)[0, 0].detach().cpu().numpy()

    if mapa.shape != (alto_orig, ancho_orig):
        mapa = zoom(
            mapa,
            (alto_orig / mapa.shape[0], ancho_orig / mapa.shape[1]),
            order=1,
        )

    minimo, maximo = float(mapa.min()), float(mapa.max())
    if maximo > minimo:
        mapa = (mapa - minimo) / (maximo - minimo)
    else:
        mapa = np.zeros_like(mapa)

    return mapa.astype(np.float32)
