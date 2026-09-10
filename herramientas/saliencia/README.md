# Mapas de atención locales

Predice dónde cae la mirada en una sección del sitio, con **DeepGaze IIE**
corriendo en esta máquina. Reemplaza a las extensiones tipo Attention
Insight: sin créditos, sin cuenta, y **ninguna captura sale de la
computadora**.

```
herramientas/saliencia/
  modelo.py     Carga DeepGaze IIE y calcula el mapa
  capturar.py   Sirve out/ y captura una sección con Chromium
  mapa.py       Dibuja el heatmap y puntúa zonas
  analizar.py   Todo junto: capturar + mapa + reporte  ← el de uso diario
  capturas/     Salidas (ignoradas por git)
```

---

## Instalación

Requiere Python 3.10+. Se recomienda un entorno virtual para no tocar el
Python global.

```bash
python -m venv .venv
source .venv/Scripts/activate      # Windows (Git Bash)
# .venv\Scripts\activate           # Windows (PowerShell)
# source .venv/bin/activate        # macOS / Linux
```

**Con GPU NVIDIA** — instalá torch primero desde el índice de CUDA, o va a
bajar la versión de CPU:

```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu126
```

Después, el resto:

```bash
pip install -r herramientas/saliencia/requirements.txt
python -m playwright install chromium
```

La primera corrida descarga ~500 MB de pesos (DeepGaze + ResNeXt) y los
cachea en `~/.cache/torch`. Las siguientes arrancan en segundos.

### Verificar que quedó bien

```bash
python -c "import torch; print('CUDA:', torch.cuda.is_available())"
```

`False` no es un error: funciona igual en CPU, solo más lento (~30 s por
imagen contra ~2 s).

---

## Uso

Siempre con el sitio construido, porque mide el export real:

```bash
npm run build
```

### El comando de todos los días

```bash
python -m herramientas.saliencia.analizar contacto
python -m herramientas.saliencia.analizar contacto --mobile
```

Deja dos PNG en `capturas/` (la captura y el heatmap) e imprime qué
porcentaje de la atención total se lleva cada elemento:

```
zona                                atencion    pico
----------------------------------------------------
h2:Trabajemos juntos                   26.5%    1.00
textarea                                3.5%    0.12
button:Escribirme ->                    3.2%    0.45
a:LINKEDIN linkedin.com/in/...          2.2%    0.17
a:EMAIL hernandez.joaquin34...          1.9%    0.16
```

Las zonas salen del DOM, no se escriben a mano: cada botón, enlace,
título y campo de la sección aporta su rectángulo. Eso permite comparar
dos variantes con números —"¿el CTA le gana a los links?"— en vez de
mirar el degradé y opinar.

Los ids de sección son los de `lib/contenido.js`: `sobre-mi`,
`trayectoria`, `capacidades`, `proyectos`, `como-trabajo`,
`aprendizajes`, `contacto`.

### Piezas sueltas

```bash
# Solo capturar
python -m herramientas.saliencia.capturar --seccion proyectos
python -m herramientas.saliencia.capturar --completa

# Mapa sobre cualquier PNG (sirve para mockups, no solo para el sitio)
python -m herramientas.saliencia.mapa ruta/a/imagen.png
```

---

## Cómo leer el resultado

**Qué mide.** Saliencia *bottom-up*: qué atrae el ojo en la primera
mirada, por contraste, tamaño, caras, texto y posición. Está entrenado
con eye-tracking real (MIT1003/SALICON), no es una heurística de
contraste.

**Qué no mide.** Intención. Alguien que entró decidido a escribirte va a
buscar el formulario aunque el mapa no lo marque. Un CTA "frío" no es
necesariamente un CTA que no convierte.

**Para qué sirve de verdad:** comparar dos variantes del mismo diseño. El
número absoluto importa poco; que el botón pase de 1.2% a 3.2% después de
un cambio, mucho.

**El título casi siempre gana.** Es texto grande y de alto contraste: es
esperable y no es un problema en sí. Lo que interesa es la pelea entre
elementos del mismo rango — el CTA contra los enlaces que compiten con él.

Si querés datos de comportamiento real y no predicción, eso es otra cosa:
hace falta analítica con visitantes (Umami, Plausible, Clarity), con el
costo de privacidad que implica.

---

## Notas de implementación

- `modelo.py` registra un módulo `clip` vacío antes de importar
  DeepGaze. El `__init__` del paquete importa modelos que dependen de
  CLIP —que solo se instala desde GitHub—, pero DeepGaze IIE no lo usa.
- Las capturas desactivan animaciones y fuerzan el estado final de
  `[data-reveal]`, si no se mide una sección a medio aparecer.
- El servidor local replica el `basePath` de producción (`/.hz-portfolio`),
  porque el export lleva ese prefijo escrito en cada ruta.
- Las imágenes se reducen a 1024 px de lado mayor antes de inferir, y el
  mapa se reescala al tamaño original. Una captura de página completa no
  entra en memoria de GPU.
