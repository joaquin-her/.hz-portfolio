"""
Captura una seccion, calcula su mapa de atencion y reporta quien gana.

Es el comando de uso diario: hace en un paso lo que ``capturar`` y
``mapa`` hacen por separado.

Las zonas no se escriben a mano: se leen del DOM. Cada elemento
interesante de la seccion —el CTA, los enlaces, el titulo, cada campo del
formulario— aporta su rectangulo, y el reporte dice que porcentaje de la
atencion total cae en cada uno. Eso permite responder "¿el boton gana o
pierde contra los links?" con un numero en vez de mirando el degrade.

Uso:
    python -m herramientas.saliencia.analizar contacto
    python -m herramientas.saliencia.analizar contacto --mobile
"""

from __future__ import annotations

import argparse
from pathlib import Path

from playwright.sync_api import sync_playwright

from .capturar import BASE_PATH, EXPORT, SALIDA, VIEWPORTS, servidor
from .mapa import puntuar_zonas, superponer

# Que se considera un elemento medible dentro de la seccion. Se apunta a
# lo que compite por la mirada: llamados a la accion, enlaces, titulos,
# campos e imagenes.
SELECTOR = (
    "button, a, h1, h2, h3, input, textarea, select, "
    "figure, img, [class*=cta], [class*=eyebrow]"
)

# Debajo de esto un elemento no se reporta: son iconos, separadores y
# fragmentos que ensucian la tabla sin aportar.
AREA_MINIMA = 900


def _ascii(texto: str) -> str:
    """
    Deja el texto imprimible en cualquier consola.

    La consola de Windows usa cp1252 y falla con las flechas y las comillas
    tipograficas que aparecen en el copy del sitio.
    """
    reemplazos = {
        "→": "->", "←": "<-", "—": "-", "–": "-",
        "…": "...", "·": "-", "“": '"', "”": '"',
        "‘": "'", "’": "'", " ": " ",
    }
    for viejo, nuevo in reemplazos.items():
        texto = texto.replace(viejo, nuevo)

    # Los acentos se transliteran en vez de descartarse: "Como trabajo"
    # tiene que leerse asi y no como "C?mo trabajo".
    acentos = str.maketrans(
        "áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜñÑçÇ",
        "aeiouAEIOUaeiouAEIOUaeiouAEIOUnNcC",
    )
    texto = texto.translate(acentos)
    return texto.encode("ascii", "replace").decode("ascii")


def _nombrar(datos: dict, usados: dict[str, int]) -> str:
    """Etiqueta legible para el reporte, a partir del DOM."""
    texto = (datos.get("texto") or "").strip().replace("\n", " ")
    texto = _ascii(texto)
    if len(texto) > 26:
        texto = texto[:25] + "..."
    base = texto or _ascii(datos.get("clase") or "") or datos.get("tag") or "elemento"
    base = f"{datos['tag']}:{base}" if texto else base

    # Dos elementos con el mismo texto (por ejemplo dos "Ampliar") se
    # distinguen con un sufijo, si no se pisan en el diccionario.
    usados[base] = usados.get(base, 0) + 1
    return base if usados[base] == 1 else f"{base} ({usados[base]})"


def zonas_de_la_seccion(seccion: str, mobile: bool = False) -> tuple[Path, dict]:
    """
    Captura la seccion y devuelve (png, zonas) con las zonas ya medidas
    en coordenadas relativas a esa captura.
    """
    if not (EXPORT / "index.html").exists():
        raise SystemExit("No existe out/index.html. Corré `npm run build` primero.")

    SALIDA.mkdir(parents=True, exist_ok=True)
    perfil = "mobile" if mobile else "desktop"
    destino = SALIDA / f"{seccion}-{perfil}.png"

    with servidor(EXPORT) as url, sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page(viewport=VIEWPORTS[perfil], device_scale_factor=1)
        pagina.goto(url, wait_until="networkidle")
        pagina.add_style_tag(
            content="*,*::before,*::after{animation:none!important;"
            "transition:none!important}"
            "[data-reveal]{opacity:1!important;transform:none!important;"
            "filter:none!important}"
        )

        elemento = pagina.query_selector(f"#{seccion}")
        if elemento is None:
            navegador.close()
            raise SystemExit(f"No hay ninguna seccion con id «{seccion}».")

        elemento.scroll_into_view_if_needed()
        pagina.wait_for_timeout(400)
        elemento.screenshot(path=str(destino))

        # Las cajas se miden respecto de la seccion, que es el origen de
        # la captura: sin restar ese offset las zonas quedan corridas.
        crudas = pagina.evaluate(
            """([id, selector]) => {
                const raiz = document.getElementById(id);
                const base = raiz.getBoundingClientRect();
                return [...raiz.querySelectorAll(selector)].map((el) => {
                    const r = el.getBoundingClientRect();
                    const estilo = getComputedStyle(el);
                    return {
                        tag: el.tagName.toLowerCase(),
                        clase: (el.className || '').toString().split(' ')[0],
                        texto: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 60),
                        x: Math.round(r.left - base.left),
                        y: Math.round(r.top - base.top),
                        ancho: Math.round(r.width),
                        alto: Math.round(r.height),
                        visible: estilo.visibility !== 'hidden' && estilo.display !== 'none',
                    };
                });
            }""",
            [seccion, SELECTOR],
        )
        navegador.close()

    from PIL import Image

    with Image.open(destino) as img:
        ancho_img, alto_img = img.size

    zonas: dict[str, list[int]] = {}
    usados: dict[str, int] = {}
    for d in crudas:
        if not d["visible"] or d["ancho"] * d["alto"] < AREA_MINIMA:
            continue
        # Recortar a los limites de la captura: un elemento puede
        # desbordar la seccion y el slice quedaria vacio.
        x = max(0, min(d["x"], ancho_img - 1))
        y = max(0, min(d["y"], alto_img - 1))
        ancho = max(1, min(d["ancho"], ancho_img - x))
        alto = max(1, min(d["alto"], alto_img - y))
        zonas[_nombrar(d, usados)] = [x, y, ancho, alto]

    return destino, zonas


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("seccion", help="id de la seccion (contacto, proyectos…)")
    ap.add_argument("--mobile", action="store_true")
    ap.add_argument("--top", type=int, default=12, help="cuantas zonas listar")
    args = ap.parse_args()

    captura, zonas = zonas_de_la_seccion(args.seccion, args.mobile)
    mapa = superponer(captura)

    print(f"captura : {captura}")
    print(f"mapa    : {mapa}")
    print(f"zonas   : {len(zonas)}")
    print()

    if not zonas:
        print("No se detectaron elementos medibles en la seccion.")
        return

    filas = puntuar_zonas(captura, zonas)
    print(f"{'zona':<34}{'atencion':>10}{'pico':>8}")
    print("-" * 52)
    for nombre, parte, pico in filas[: args.top]:
        print(f"{nombre:<34}{parte:>9.1f}%{pico:>8.2f}")


if __name__ == "__main__":
    main()
