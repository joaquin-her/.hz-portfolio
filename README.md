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
a `main`. Para activarlo: **Settings → Pages → Source: GitHub Actions**.

`next.config.mjs` define `basePath: '/mi-cv'` porque el sitio se sirve en
`usuario.github.io/mi-cv`. Si lo movés al repositorio `usuario.github.io`,
poné `basePath` y `assetPrefix` en cadena vacía.

## Secciones

1. Sobre mí (apertura)
2. Trayectoria
3. Capacidades
4. Proyectos
5. Cómo trabajo
6. Lo que aprendí
7. Contacto
