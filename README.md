# Portafolio — Joaquín Hernández

One-pager personal. Next.js con export estático, desplegado en GitHub Pages.

## Estructura

```
app/
  layout.js        Fuentes, metadatos y SEO
  page.js          Las 7 secciones del sitio
  globals.css      Tokens de diseño, layout y animaciones
components/
  Reveal.js        Animación de entrada al hacer scroll
  Fondo.js         Capa de gráficos vectorizados de fondo
lib/
  contenido.js     Todo el copy del sitio, en un solo lugar
public/assets/     Imágenes
```

El copy vive en `lib/contenido.js` y es espejo de `web-contenido-final.md`,
que además documenta las reglas de diseño y los datos verificables que no
deben modificarse.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera out/
```

## Despliegue

El workflow `.github/workflows/deploy.yml` construye y publica en cada push
a `main`.

**Antes del primer deploy** hay que habilitar Pages: **Settings → Pages →
Source: GitHub Actions**. Sin ese paso `configure-pages` falla con
`Get Pages site failed ... Not Found`, porque el sitio todavía no existe.

`next.config.mjs` define `basePath: '/.hz-portfolio'`, que debe coincidir
con el nombre del repositorio: el sitio se sirve en
`joaquin-her.github.io/.hz-portfolio`. Si lo movés al repositorio
`joaquin-her.github.io`, poné `repo = ''`.

## Secciones

1. Sobre mí (apertura)
2. Trayectoria
3. Capacidades
4. Proyectos
5. Cómo trabajo
6. Lo que aprendí
7. Contacto
