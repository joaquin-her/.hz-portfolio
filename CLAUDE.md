# CLAUDE.md — Fuente de verdad del repositorio

Portafolio personal de Joaquín Hernández. One-pager de siete secciones, Next.js con
export estático, desplegado en GitHub Pages.

Este documento explica **cómo funciona y cómo se relaciona cada pieza**. Si al trabajar
sobre el repo descubrís algo que lo contradice, el código manda: corregí este archivo.

---

## Regla que gobierna todo lo demás

**El copy no se inventa ni se retoca.** `web-contenido-final.md` es el contenido cerrado
del sitio y contiene una sección llamada *"Datos que NO deben modificarse"*: afirmaciones
verificables sobre proyectos reales (26 de 35 commits, 7 USD/mes, 110 hackers, 664
commits, 200 fotos, cuatro semanas…). Se pueden acortar, nunca cambiar de sentido.

`lib/contenido.js` es el espejo ejecutable de ese documento. Al tocar textos, se editan
**los dos**.

---

## Mapa del proyecto

```
app/
  layout.js      Fuentes, metadatos, SEO. Componente de servidor.
  page.js        Las 7 secciones. Componente de servidor.
  globals.css    Todo el CSS del sitio. Sin CSS-in-JS ni Tailwind.
  icon.svg       Favicon: el monograma ".hz"
  apple-icon.png Ídem para iOS (Next no acepta SVG en ese formato)

components/
  Navegacion.js  Barra fija + panel hamburguesa      [cliente]
  Marca.js       Monograma ".hz" en SVG              [servidor]
  Reveal.js      Aparición al entrar en viewport     [cliente]
  Carrusel.js    Capturas deslizables                [cliente]
  Visor.js       Lightbox a pantalla completa        [cliente]
  Fondo.js       Formas de fondo con parallax        [cliente]
  FondoHero.js   Fondo de la apertura, estático      [servidor]

lib/
  contenido.js   Todo el copy y los datos del sitio
  rutas.js       Helper de basePath para assets

public/assets/   Imágenes servidas
assets/          Originales sin optimizar (no se sirven)
```

`jsconfig.json` mapea `@/*` a la raíz: los imports van siempre como `@/components/X`.

---

## Cómo se relacionan las piezas

```
layout.js  ─ fuentes + metadatos
    └── page.js
         ├── Navegacion ── Marca
         │        └── lib/contenido (navegacion)
         ├── FondoHero            (fondo de la apertura)
         ├── Fondo                (fondo del resto)
         ├── Reveal × N           (entradas por scroll)
         ├── Carrusel ── Visor    (capturas de proyectos)
         │        └── lib/rutas
         └── lib/contenido        (todo el copy)
```

`page.js` es el único que arma la página: no hay componentes de sección. Las siete
secciones viven ahí como JSX plano, y las piezas reutilizables se importan.

Dentro de `page.js` hay dos componentes locales que no se exportan:

- **`Caso`** — arma un proyecto del zigzag. Decide de qué lado va la imagen según
  `ladoImagen`, y usa esa misma orientación como variante de entrada.
- **`Marco`** — el recuadro punteado de un asset pendiente. Solo se usa cuando un
  proyecto no tiene `laminas`.
- **`ConCodigo`** — reemplaza el marcador `{code}` de un texto por un `<code>` real.

---

## Las siete secciones

El orden del scroll es deliberado: primero quién es, después la evidencia escaneable,
después la prueba concreta y recién ahí el argumento denso.

| # | Sección | id | Peso |
|---|---|---|---|
| 1 | Sobre mí *(apertura / hero)* | `sobre-mi` | Alto |
| 2 | Trayectoria | `trayectoria` | Bajo |
| 3 | Capacidades | `capacidades` | Bajo |
| 4 | Proyectos | `proyectos` | Alto |
| 5 | Cómo trabajo | `como-trabajo` | **Máximo** |
| 6 | Lo que aprendí | `aprendizajes` | Medio |
| 7 | Contacto | `contacto` | Alto |

Los `id` son el contrato con `navegacion` en `lib/contenido.js`. Si cambia uno, cambian
los dos o se rompe el menú.

**La apertura es la excepción de layout.** No tiene padding ni margin ni ancho máximo:
así su fondo llega a los bordes de la ventana. El contenido se centra dentro de
`.apertura__interior`, que recupera el `max-width` y el espaciado. El fondo se excluye
del grid con `:not(.hero-fondo)` para que no reclame una celda.

---

## Sistema de diseño

Definido en `web-contenido-final.md`, implementado como tokens en `globals.css`.

| Token | Hex | Uso |
|---|---|---|
| `--tinta` | `#0a0e14` | Titulares, texto principal |
| `--petroleo-900` | `#182b31` | Bloques de énfasis, contacto |
| `--petroleo-700` | `#1e3a46` | CTA, línea del zigzag, acentos |
| `--acero` | `#58717d` | Texto secundario |
| `--bruma` | `#b4c3cc` | Bordes, separadores |
| `--papel` | `#f4fefe` | Fondo general |

Tipografía vía `next/font/google`, expuesta como variables CSS:

- `--serif` → **Bricolage Grotesque** — todos los títulos, citas y números grandes
- `--sans` → **Inter** — cuerpo
- `--mono` → **IBM Plex Mono** — etiquetas, chips, datos técnicos

`--margen` es el padding lateral: 120px, 56px bajo 1100px, 24px bajo 720px.

**Convención de clases:** BEM en español (`.carrusel__lamina`, `.dato__valor--chico`).
Todo el CSS vive en `globals.css`, ordenado por secciones con encabezados de comentario.

---

## Movimiento

Tres mecanismos distintos, cada uno con su razón:

**`Reveal`** — aparición al entrar en viewport, vía IntersectionObserver. Cuatro
variantes: `subir` (por defecto), `izquierda`, `derecha`, `escala`. En Proyectos cada
caso entra desde el lado que ocupa en el zigzag. Bajo 980px el movimiento lateral pasa a
vertical para no generar scroll horizontal.

**Entrada al cargar** — la apertura no usa `Reveal`: al estar ya en viewport se mostraría
de inmediato y no habría forma de ordenarla respecto de la barra. Son animaciones CSS con
delays explícitos (`.entra--foto`, `.entra--texto`), escalonadas después de que la barra
termina de bajar.

**Parallax** — `Fondo.js` desplaza sus capas con el scroll, cada una a su velocidad y
algunas en sentido contrario. Cada capa se calcula desde su propio `data-ancla`, no desde
el origen del documento: si no, el desfase se acumularía y las capas de abajo saldrían de
cuadro. Se pinta dentro de `requestAnimationFrame` sobre un listener pasivo.

`FondoHero` **no** tiene parallax — es estático y por eso puede ser componente de servidor.

Todo respeta `prefers-reduced-motion`.

---

## Carrusel y visor

`Carrusel` usa scroll nativo con `scroll-snap`: el gesto táctil, la rueda y el trackpad
funcionan sin librería. El índice activo se deduce observando qué lámina está centrada.

La navegación es **circular** en ambos: `(i + paso + total) % total`. Desde la última se
vuelve a la primera y viceversa. Vale para flechas, teclado y visor.

Cada lámina es un botón que abre el `Visor`.

**El visor se monta en `<body>` con un portal, y esto no es opcional.** Dentro del árbol
de la sección, el `will-change` que `[data-reveal]` aplica a los ancestros crea un
*containing block*: el `position: fixed` del visor se anclaría a esa caja en vez de a la
ventana, y quedaría confinado a la sección. Si alguna vez el visor "no ocupa toda la
pantalla", esta es la causa.

El visor además atrapa el foco, lo devuelve al cerrarse y bloquea el scroll del fondo.

---

## Imágenes y rutas

**Nunca escribas un `src` literal.** El sitio se sirve bajo `/<repo>`, y `next/image` con
`unoptimized: true` **no aplica el `basePath` al `src`**. Todas las rutas de assets pasan
por `ruta()` de `lib/rutas.js`, que lee `NEXT_PUBLIC_BASE_PATH` — expuesto desde
`next.config.mjs` para que coincida en servidor y cliente.

Sin eso, las imágenes dan 404 en producción aunque funcionen en local.

Las capturas se optimizan a WebP de 1400px antes de entrar a `public/assets/`. Los
originales quedan en `assets/`, fuera de lo que se sirve. El diagrama de arquitectura es
SVG (9 KB contra 191 KB del PNG equivalente) y usa `ajuste: 'contener'` porque es
vertical: con `cover` se perdería más de la mitad.

---

## Navegación por secciones

Los enlaces del panel mobile **no usan el salto nativo del navegador**. El panel bloquea
el scroll del body mientras está abierto; si el cierre y el salto ocurren en el mismo
cuadro, el destino se calcula sobre un layout todavía bloqueado y se aterriza en el lugar
equivocado. `irASeccion` cierra primero y salta en el cuadro siguiente.

Las secciones declaran `scroll-margin-top` (76px, 64px en mobile) para que la barra fija
no tape el encabezado de destino.

**El panel cerrado tiene que salir del árbol, no solo volverse invisible.** `.panel` es
`position: fixed; inset: 0`: con solo `opacity: 0` seguía capturando los clics de toda la
página, y cada uno caía sobre el enlace que ocupara esa altura — de ahí el síntoma de
"toco cualquier parte y me manda a una sección al azar". El atributo `hidden` por sí solo
no alcanza: el `display: flex` de `.panel` le gana a la regla del navegador, así que
`.panel[hidden] { display: none }` se declara **después** de `.panel` (misma
especificidad, gana la última). El desmontaje se difiere 300ms para no cortar el fundido.

**Los fondos no llevan `feGaussianBlur`.** Un filtro SVG sobre una capa a pantalla
completa obliga a rasterizarla entera cada vez que cambia su `transform` — justo lo que
hace el parallax en cada cuadro — y se notaba como caída de fps al abrir la página. La
difuminación se consigue con paradas intermedias en los gradientes, que compone la GPU.
Por lo mismo, el bucle de scroll no lee geometría (`offsetTop` fuerza layout) ni reescribe
transforms que no cambiaron, y no se deja `will-change` permanente.

---

## Despliegue

Repositorio: `joaquin-her/.hz-portfolio` → **https://joaquin-her.github.io/.hz-portfolio/**

`next.config.mjs` define `repo = '.hz-portfolio'`, que **debe coincidir con el nombre del
repositorio**. Si el sitio se mueve a `joaquin-her.github.io`, poner `repo = ''`.

Un solo workflow: `.github/workflows/deploy.yml`, Node 22, en cada push a `main`. No
agregar un segundo workflow de Pages: ambos comparten `concurrency: pages`, se pisan y
queda desplegado el que termine último.

Pages debe estar habilitado a mano en **Settings → Pages → Source: GitHub Actions**.

```bash
npm run dev      # http://localhost:3000
npm run build    # genera out/
```

**Commits: sin firma y sin `Co-Authored-By`.** Los commits van sin firmar
(`--no-gpg-sign`) y **no** llevan trailer de coautoría — ni `Co-Authored-By: Claude`, ni
ninguna otra atribución generada. El historial va a nombre de Joaquín y nada más.

**Verificación antes de dar por buena una publicación:** revisar que `out/index.html` no
contenga rutas con un basePath viejo, y que los datos verificables sigan presentes. Un
build que compila no garantiza un sitio que funciona — varios errores de este repo
(rutas sin basePath, workflows duplicados) pasaron el build sin problema.

---

## Archivos que no son del sitio

`Main.dc.html`, `Mobile.dc.html` y `canvas.json` son el prototipo de diseño original,
anterior a la implementación. Se conservan como referencia; no forman parte del build.
