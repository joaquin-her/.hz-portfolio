"""
Captura una pagina —o una seccion— con Chromium headless.

Sirve el sitio ya construido desde ``out/`` con un servidor local, asi que
lo que se mide es exactamente lo que se despliega, no el modo desarrollo.

Uso:
    python -m herramientas.saliencia.capturar --seccion contacto
    python -m herramientas.saliencia.capturar --seccion contacto --mobile
    python -m herramientas.saliencia.capturar --completa
"""

from __future__ import annotations

import argparse
import contextlib
import functools
import http.server
import socket
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

RAIZ = Path(__file__).resolve().parents[2]
EXPORT = RAIZ / "out"
SALIDA = RAIZ / "herramientas" / "saliencia" / "capturas"

# El sitio se sirve bajo /<repo> en produccion, y el export lleva ese
# prefijo escrito en cada ruta: hay que respetarlo o las imagenes dan 404.
BASE_PATH = "/.hz-portfolio"

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
}


@contextlib.contextmanager
def servidor(directorio: Path):
    """Sirve ``directorio`` en un puerto libre mientras dure el contexto."""
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        puerto = s.getsockname()[1]

    # El export escribe las rutas con basePath: se sirve el mismo arbol
    # bajo ese prefijo para que resuelvan igual que en produccion.
    class ConBasePath(http.server.SimpleHTTPRequestHandler):
        def translate_path(self, path):
            if path.startswith(BASE_PATH):
                path = path[len(BASE_PATH):] or "/"
            return super().translate_path(path)

        def log_message(self, *_args):
            pass  # sin ruido en consola

    httpd = socketserver.TCPServer(
        ("127.0.0.1", puerto),
        functools.partial(ConBasePath, directory=str(directorio)),
    )
    hilo = threading.Thread(target=httpd.serve_forever, daemon=True)
    hilo.start()
    try:
        yield f"http://127.0.0.1:{puerto}{BASE_PATH}/"
    finally:
        httpd.shutdown()
        httpd.server_close()


def capturar(
    seccion: str | None = None,
    mobile: bool = False,
    completa: bool = False,
    salida: Path | None = None,
) -> Path:
    """
    Deja un PNG y devuelve su ruta.

    ``seccion`` es el id de un ``<section>`` (contacto, proyectos…). Sin
    seccion captura la ventana desde el inicio, o la pagina entera con
    ``completa``.
    """
    if not (EXPORT / "index.html").exists():
        raise SystemExit(
            "No existe out/index.html. Corré `npm run build` antes de capturar."
        )

    SALIDA.mkdir(parents=True, exist_ok=True)
    perfil = "mobile" if mobile else "desktop"
    nombre = seccion or ("completa" if completa else "inicio")
    destino = salida or (SALIDA / f"{nombre}-{perfil}.png")

    with servidor(EXPORT) as url, sync_playwright() as p:
        navegador = p.chromium.launch()
        pagina = navegador.new_page(
            viewport=VIEWPORTS[perfil],
            device_scale_factor=1,
        )
        pagina.goto(url, wait_until="networkidle")

        # Las animaciones de entrada dejan elementos a medio camino: se
        # desactivan para que la captura sea del estado final y estable.
        pagina.add_style_tag(
            content="*,*::before,*::after{animation:none!important;"
            "transition:none!important}"
            "[data-reveal]{opacity:1!important;transform:none!important;"
            "filter:none!important}"
        )

        if seccion:
            elemento = pagina.query_selector(f"#{seccion}")
            if elemento is None:
                navegador.close()
                raise SystemExit(f"No hay ninguna seccion con id «{seccion}».")
            elemento.scroll_into_view_if_needed()
            pagina.wait_for_timeout(400)
            elemento.screenshot(path=str(destino))
        else:
            pagina.wait_for_timeout(400)
            pagina.screenshot(path=str(destino), full_page=completa)

        navegador.close()

    return destino


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--seccion", help="id de la seccion a capturar (ej: contacto)")
    ap.add_argument("--mobile", action="store_true", help="viewport de telefono")
    ap.add_argument("--completa", action="store_true", help="pagina entera")
    ap.add_argument("--salida", type=Path, help="ruta del PNG de salida")
    args = ap.parse_args()

    destino = capturar(args.seccion, args.mobile, args.completa, args.salida)
    print(destino)


if __name__ == "__main__":
    main()
