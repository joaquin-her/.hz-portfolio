---
name: mapa-de-atencion
description: Predice dónde cae la mirada en una sección del sitio con DeepGaze IIE local, y reporta qué porcentaje de la atención se lleva cada elemento. Usar cuando se pregunte si un CTA se ve, si un botón compite con otros elementos, dónde mira la gente, o para comparar dos variantes de un diseño antes y después de un cambio. Palabras clave -- mapa de atención, heatmap, saliencia, eye-tracking, "¿se ve el botón?", "dónde mira", attention insight.
---

# Mapa de atención

Corre DeepGaze IIE en esta máquina sobre una captura del sitio construido.
Sin servicios externos: ninguna imagen sale de la computadora.

## Antes de correr

El pipeline mide el **export real**, así que el build tiene que estar al
día. Si tocaste código desde el último build:

```bash
npm run build
```

Si el entorno no está instalado, los pasos están en
`herramientas/saliencia/README.md`. Señal de que falta: `ModuleNotFoundError`
de `torch` o `deepgaze_pytorch`.

## El comando

```bash
python -m herramientas.saliencia.analizar <seccion>
python -m herramientas.saliencia.analizar <seccion> --mobile
```

Secciones válidas (ids de `lib/contenido.js`): `sobre-mi`, `trayectoria`,
`capacidades`, `proyectos`, `como-trabajo`, `aprendizajes`, `contacto`.

Deja `capturas/<seccion>-<perfil>.png` y `-mapa.png`, e imprime la tabla
de zonas. **Siempre mirá el PNG del mapa con Read**, no solo la tabla: la
tabla dice cuánto, la imagen dice dónde y por qué.

La primera corrida de la sesión tarda ~40 s cargando pesos; las
siguientes, segundos.

## Cómo interpretar

La columna `atencion` es el porcentaje de la saliencia total que cae
dentro del rectángulo del elemento. `pico` es el punto más caliente que
toca, de 0 a 1.

Tres reglas para no sacar conclusiones falsas:

1. **Comparar pares del mismo rango, no contra el título.** Un `<h2>`
   grande se lleva 20-30% siempre; eso es esperable y no es un defecto.
   La pregunta útil es "el CTA contra los enlaces que compiten con él".
2. **El valor absoluto importa poco; el delta importa mucho.** Medí antes
   y después de un cambio sobre la misma sección y compará. Un CTA que
   pasa de 1.2% a 3.2% mejoró, aunque 3.2% suene bajo.
3. **Un elemento grande acumula más `atencion` por área.** Si un botón
   ancho empata con un link chico, el link está ganando por densidad.
   Mirá `pico` para eso.

**Medir siempre los dos perfiles.** Desktop y mobile dan resultados muy
distintos, y el problema suele estar en uno solo. Ejemplo real de este
sitio: el mismo CTA de contacto marcó 3.2% en desktop y 16.5% (pico 1.00,
el punto más caliente de la sección) en mobile, porque la columna única lo
pone en el camino de lectura.

## Lo que este modelo NO sabe

Predice saliencia bottom-up: qué atrae el ojo en la primera mirada, sin
tarea asignada. **No conoce la intención.** Alguien que entró decidido a
escribir va a encontrar el formulario aunque el mapa no lo marque.

Por eso: un mapa frío sobre un CTA es una señal de diseño, no una prueba
de que no convierte. No presentar estos números como datos de
comportamiento real ni como métricas de conversión. Para eso hace falta
analítica con visitantes reales, que es otra herramienta y tiene otro
costo de privacidad.

## Flujo típico para mejorar un elemento

1. Medir la sección —desktop y mobile— y guardar los números de referencia.
2. Hacer **un** cambio (posición, tamaño, contraste, orden en el DOM).
3. `npm run build` y volver a medir.
4. Comparar el elemento objetivo contra sus competidores directos.

La posición suele pesar más que el estilo: un elemento al fondo de una
columna larga no se rescata agrandándolo. Si un CTA queda debajo de todo,
mover o acortar lo que tiene encima rinde más que cambiarle el color.

## Piezas sueltas

```bash
# Captura sin análisis
python -m herramientas.saliencia.capturar --seccion proyectos --mobile

# Mapa sobre cualquier PNG (mockups, diagramas, capturas ajenas)
python -m herramientas.saliencia.mapa ruta/imagen.png
```
