"""
Dibuja el mapa de atencion sobre la captura y reporta que zonas ganan.

Uso:
    python -m herramientas.saliencia.mapa captura.png
    python -m herramientas.saliencia.mapa captura.png --zonas zonas.json
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image

from .modelo import mapa_de_saliencia

# Rampa tipo "jet", como la de las herramientas comerciales: azul frio
# donde el ojo no va, rojo donde se concentra. Se elige por familiaridad
# de lectura, no por precision cromatica.
RAMPA = [
    (0.00, (0, 0, 90)),
    (0.25, (0, 128, 220)),
    (0.45, (0, 200, 160)),
    (0.62, (170, 230, 60)),
    (0.80, (250, 190, 40)),
    (1.00, (200, 30, 20)),
]


def _colorear(mapa: np.ndarray) -> np.ndarray:
    """Convierte el mapa [0,1] en RGB segun la rampa."""
    puntos = np.array([p for p, _ in RAMPA])
    colores = np.array([c for _, c in RAMPA], dtype=np.float32)
    salida = np.zeros((*mapa.shape, 3), dtype=np.float32)
    for canal in range(3):
        salida[..., canal] = np.interp(mapa, puntos, colores[:, canal])
    return salida


def superponer(
    ruta_imagen: str | Path,
    destino: str | Path | None = None,
    opacidad: float = 0.62,
    umbral: float = 0.12,
) -> Path:
    """
    Deja un PNG con el heatmap encima de la captura y devuelve su ruta.

    ``umbral`` deja ver la pagina tal cual donde practicamente no hay
    atencion, en vez de teñir todo de azul.
    """
    ruta_imagen = Path(ruta_imagen)
    destino = Path(destino) if destino else ruta_imagen.with_name(
        ruta_imagen.stem + "-mapa.png"
    )

    base = Image.open(ruta_imagen).convert("RGB")
    mapa = mapa_de_saliencia(str(ruta_imagen))

    calor = _colorear(mapa)
    fondo = np.array(base, dtype=np.float32)

    # La mezcla sube donde el mapa es alto: las zonas frias quedan casi
    # transparentes y se sigue leyendo el diseño debajo.
    alfa = np.clip((mapa - umbral) / max(1e-6, 1 - umbral), 0, 1)[..., None] * opacidad
    mezcla = fondo * (1 - alfa) + calor * alfa

    Image.fromarray(mezcla.astype(np.uint8)).save(destino)
    return destino


def puntuar_zonas(ruta_imagen: str | Path, zonas: dict[str, list[int]]) -> list[tuple]:
    """
    Mide cuanta atencion se lleva cada zona.

    ``zonas`` es ``{"nombre": [x, y, ancho, alto]}`` en pixeles de la
    captura. Devuelve una lista ordenada de mayor a menor con el
    porcentaje de atencion total que cae dentro de cada rectangulo.

    El porcentaje es sobre la suma del mapa completo, asi que las zonas
    que no cubren toda la imagen no suman 100.
    """
    mapa = mapa_de_saliencia(str(ruta_imagen))
    total = float(mapa.sum()) or 1.0

    filas = []
    for nombre, (x, y, ancho, alto) in zonas.items():
        recorte = mapa[y : y + alto, x : x + ancho]
        parte = float(recorte.sum()) / total * 100
        pico = float(recorte.max()) if recorte.size else 0.0
        filas.append((nombre, parte, pico))

    return sorted(filas, key=lambda f: f[1], reverse=True)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("imagen", type=Path)
    ap.add_argument("--salida", type=Path)
    ap.add_argument("--zonas", type=Path, help="JSON {nombre: [x, y, ancho, alto]}")
    args = ap.parse_args()

    destino = superponer(args.imagen, args.salida)
    print(destino)

    if args.zonas:
        zonas = json.loads(args.zonas.read_text(encoding="utf-8"))
        print()
        print(f"{'zona':<28}{'atencion':>10}{'pico':>8}")
        for nombre, parte, pico in puntuar_zonas(args.imagen, zonas):
            print(f"{nombre:<28}{parte:>9.1f}%{pico:>8.2f}")


if __name__ == "__main__":
    main()
