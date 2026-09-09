# Web personal — Spec de contenido final (handoff a diseño)

> **Propósito de este documento:** entregar el **contenido cerrado** del sitio a una sesión de
> diseño/prototipado. Todo el copy de acá es **final**: no hay opciones ni decisiones abiertas.
> La estrategia y el razonamiento detrás viven en `web-personal.md` (no hace falta leerlo para diseñar).

**Decisiones cerradas:**
- **Audiencia:** doble — socios/clientes **y** búsqueda de empleo. Tono: liderazgo con
  capacidad técnica visible. Ni humilde de más, ni corporativo.
- **Idioma:** español (Argentina), voz en primera persona, trato informal ("vos" no aparece;
  el sitio habla en primera persona sobre sí mismo).
- **Producto actual:** bajo reserva. **No nombrar** producto ni empresa. (No aplica al caso
  freelance: sus capturas están autorizadas por el dueño y muestran la marca.)
- **Formato:** one-pager con scroll vertical, 7 secciones. Abre con *Sobre mí* fusionado al hero.

---

## ⚙️ Reglas de diseño

> **✅ DEFINIDAS.** Decisiones cerradas por Joaquín. Fuente: `inspiracion/color palette.jpeg`
> (paleta) e `inspiracion/scrollable-webpage.jpeg` (recorrido de scroll).

- **Paleta:** base clara con acentos petróleo.
  | Token | Hex | Uso |
  |---|---|---|
  | `tinta` | `#0A0E14` | Titulares, texto principal |
  | `petroleo-900` | `#182B31` | Bloques de énfasis, cierre de sección |
  | `petroleo-700` | `#1E3A46` | CTA primario, línea del recorrido, chips |
  | `acero` | `#58717D` | Texto secundario, bajadas, etiquetas |
  | `bruma` | `#B4C3CC` | Bordes, separadores, placeholders |
  | `papel` | `#F4FEFE` | Fondo general |
- **Tipografía:** todos los títulos (H1, H2, H3, citas destacadas y números grandes) en
  **Bricolage Grotesque** — grotesco contemporáneo, denso, de terminaciones cortadas. Cuerpo en
  **Inter**. Monoespaciada (**IBM Plex Mono**) en mayúsculas y cuerpo chico para etiquetas, chips
  y datos técnicos. El contraste grotesco/sans/mono es lo que sostiene el tono: técnico y
  decidido, no editorial-suave.
- **Modo claro / oscuro / ambos:** **claro únicamente.** Fondo `papel`, tipografía `tinta`. Sin
  toggle. Los azules entran como acento, nunca como fondo de página completa — salvo bloques
  puntuales de énfasis (cierre de la sección 2, contacto).
- **Referencias visuales:** `inspiracion/scrollable-webpage.jpeg`. Lo que se toma de ahí es el
  **recorrido serpenteante**: una línea conectora que atraviesa el scroll y va alternando los
  bloques izquierda/derecha. Lo que **no** se toma: la estética de fotografía de naturaleza, el
  papel texturado ni la ornamentación manuscrita.
- **Densidad:** aireado. Espacio en blanco generoso entre secciones; el contenido respira. La
  excepción es la sección 2 (Capacidades), que va compacta y escaneable a propósito.
- **Animación:** **sutil.** Fade-in con desplazamiento leve al entrar en viewport, transiciones
  en hover. Nada de parallax ni contadores animados. Respetar `prefers-reduced-motion`.
- **¿Foto personal?** **Sí**, protagonista: retrato
  grande en la apertura (sección 1, *Sobre mí*, que hace las veces de hero) y chica en el pie.
  Archivo: `assets/profile_img.png`.

**Tratamiento de la sección 4 (Proyectos):** zigzag. Los cuatro casos se alternan izquierda/derecha
unidos por la línea del recorrido. Cada caso reserva un espacio de imagen con **placeholder
marcado** — las capturas todavía no existen (ver inventario), y el layout debe aceptarlas después
sin rediseñarse. En mobile el zigzag colapsa a una columna con la línea corrida a la izquierda.

**Restricciones que sí vienen del contenido (respetarlas):**
- La sección 5 (*Cómo trabajo*) tiene 5 ítems y es la más importante: necesita jerarquía visual propia.
- Los 4 proyectos tienen largo desigual a propósito. El caso freelance necesita más espacio (3 actos).
- Hay 3 citas destacadas que deben distinguirse claramente del cuerpo de texto.
- Debe funcionar en mobile: el 60% del tráfico va a venir de LinkedIn.

---

## 🗺️ Mapa del scroll

| # | Sección | Bloques | Peso visual |
|---|---|---|---|
| 1 | Sobre mí *(apertura / hero)* | Foto + nombre + 2 párrafos + 3 chips + CTA | Alto |
| 2 | Trayectoria | H2 + 4 datos | Bajo |
| 3 | Capacidades | H2 + 4 grupos | Bajo (escaneable) |
| 4 | Proyectos | H2 + 4 casos | Alto |
| 5 | Cómo trabajo | H2 + intro + 5 ítems + cierre | **Máximo** |
| 6 | Lo que aprendí | H2 + 3 citas | Medio |
| 7 | Contacto | H2 + frase + 3 links | Alto |

**Lógica del orden:** el sitio abre presentando a la persona, sigue con la evidencia dura
(trayectoria y capacidades: escaneables, para quien viene a filtrar rápido), después entra en
la prueba concreta (proyectos), y recién ahí llega al argumento más denso y diferencial
(*Cómo trabajo*), que necesita un lector ya interesado. Cierra con aprendizaje y contacto.

---

# 1 · SOBRE MÍ ⭐ (apertura — hace las veces de hero)

> **Nota de estructura:** esta sección fusiona el antiguo hero con *Sobre mí*. El sitio abre
> presentándome a mí, no a una declaración. La frase que antes era H1 ahora entra como
> **declaración de posicionamiento** debajo del nombre, y los chips y el CTA se conservan.

**[Foto]** `assets/profile_img.png` — protagonista, a la izquierda.

**[Nombre — H1]**
> Joaquín Hernández

**[Meta / eyebrow, sobre el nombre]**
> Buenos Aires, Argentina

**[Declaración de posicionamiento — destacada, bajo el nombre]**
> Ingeniería de software con criterio de negocio.

**[Párrafo 1]**
> Estudio Ingeniería en Informática en la UBA. Me interesa el punto donde la tecnología toca el
> negocio: no el stack por el stack, sino qué problema resuelve, para quién y a qué costo.

**[Párrafo 2]**
> Trabajo con comunicación abierta y honestidad sobre el estado real de las cosas. Prefiero
> decir "esto todavía no funciona" antes que sostener una demo que no se banca. Y cuando algo no
> da resultado, lo mido, lo digo y lo dejo.

**[Párrafo 3 — qué hago hoy]**
> Diseño y construyo productos de punta a punta, y el sistema de trabajo con el que un equipo
> desarrolla con IA. Hoy lo aplico junto a un equipo de tres personas en un producto desde cero.

**[Chip 1]** MCP server propio con OAuth 2.1 en producción
**[Chip 2]** Cliente freelance con producto activo
**[Chip 3]** Platanus Hack 26 — seleccionado entre cientos de postulantes

**[CTA primario]** Hablemos de tu proyecto
**[CTA secundario — link discreto]** Ver GitHub

---

# 2 · TRAYECTORIA

**[H2]**
> Trayectoria

**[Dato 1]** **7 años** en GitHub · 664 commits · 21 repositorios públicos
**[Dato 2]** **6 lenguajes** en proyectos reales
**[Dato 3]** **Ingeniería en Informática**, UBA — estudiante regular
**[Dato 4]** Escribo sobre lo que construyo en LinkedIn

---

# 3 · CAPACIDADES

**[H2]**
> Capacidades

**[Grupo 1 — Construyo con]**
TypeScript · React · Next.js · Python · FastAPI · Elixir / OTP · Java · SQL

**[Grupo 2 — Despliego y opero]**
Docker · Vercel · Railway · Render · Supabase · Neon · Cloudflare R2 · PostHog · CI/CD

**[Grupo 3 — IA aplicada]**
Servidores MCP propios · OAuth 2.1 para agentes · Subagentes y orquestación ·
Desarrollo guiado por especificación · LLMs locales (Ollama) · Figma como fuente de verdad

**[Grupo 4 — También trabajé con]**
C · C++ · Assembly x86 · Flutter · Terraform

**[Nota]** Español nativo · Inglés avanzado

---

# 4 · PROYECTOS

**[H2]**
> Proyectos

**[Bajada]**
> Cuatro casos donde se ve el ciclo completo: el problema, la decisión y el resultado.

---

## [Caso 1] Obsidian Vault MCP

**[Etiqueta]** Infraestructura de IA · Proyecto propio · Open source (MIT)

**[Problema]**
> Quería conectar sesiones de Claude, sin contexto previo, con mi segundo cerebro en Obsidian,
> sin depender de un dispositivo. Lo uso en Windows, Linux y Android, sincronizado por WebDAV.

**[Qué hace]**
> Un servidor MCP que le da a los clientes de IA acceso de lectura y escritura sobre cualquier
> endpoint WebDAV. En la práctica: le cuento una idea a Claude y crea la carpeta y los documentos
> en mi vault. Más tarde, desde el editor, le digo "leé los documentos de ese proyecto e
> implementalo acá".

**[Cita destacada — la decisión clave]**
> Me daba miedo que una ventana de contexto contaminada arruinara el segundo cerebro que llevo
> años construyendo. Por eso lo desplegué en dos etapas: primero un vault de prueba, después el
> personal.

**[Detalle técnico — lista corta]**
- OAuth 2.1 con PKCE y registro dinámico de clientes
- Migración de transporte local a HTTP remoto
- Soporte de archivos binarios y carga masiva
- Desplegado en Railway con Docker y volumen persistente
- Logging configurable por nivel, con trazas por herramienta

**[Nota al pie]**
> Partí de un proyecto open source existente y aporté 26 de sus 35 commits.

**[Link]** github.com/joaquin-her/obsidian-vault-mcp

---

## [Caso 2] Showroom e-commerce — cliente freelance

**[Etiqueta]** Cliente real · En producción · Freelance

**[Acto 1 — El problema]**
> El emprendimiento de un amigo vendía por Instagram, y ahí tenía un techo: cuántos productos
> alcanzaba a ver un interesado por minuto. Necesitaba un espacio propio.

**[Acto 2 — La solución]**
> Un showroom a medida: catálogo personalizable, panel de administración, gestión con login y
> una PWA instalable en Android. De la idea al lanzamiento pasaron cuatro semanas, con demos y
> entregas semanales.

**[Dato destacado — número grande]**
> **7 USD/mes** — costo total de infraestructura para el dueño, con capacidad para 100-110
> usuarios activos. La arquitectura se eligió optimizando su costo, no mi comodidad.

**[Acto 3 — El trabajo invisible]**
> Para el Mundial le propuse sumarle detalles temáticos a la interfaz. Él no sabe de diseño ni
> de código, así que le armé un proyecto en Stitch.ai para que hiciera su propia versión. Una
> llamada de treinta minutos para entender qué buscaba, y de ahí a producción: menos de tres
> horas en total.
>
> Pero el cambio trajo un problema de performance por el peso de las imágenes. Migré las 200
> fotos del catálogo a WebP, con miniaturas y dimensiones según el contexto de uso.

**[Cita destacada]**
> La optimización me llevó más tiempo que el rediseño completo. El trabajo más importante suele
> ser el menos visible.

---

## [Caso 3] alethIA — Platanus Hack 26

**[Etiqueta]** Equipo de 5 · 36 horas · Track "Future"

**[Contexto]**
> Seleccionado entre cientos de postulantes para Platanus Hack 26 Buenos Aires: 110 hackers,
> 36 horas, cuatro tracks de IA, junto a Anthropic, ElevenLabs y Supabase.

**[Qué construimos]**
> Una plataforma que recolecta los sucesos de Argentina, los agrupa por similitud y los presenta
> contrastando lo que dice cada medio: qué hay de consenso, qué versiones son mixtas y dónde
> aparecen las discrepancias.

**[Cita destacada — la tesis]**
> Centralizar todas las voces sobre un mismo hecho, para que el lector construya una verdad
> horizontal, libre del sesgo de una sola fuente.

**[Mi rol]**
> Definí los contratos entre los servicios —interfaz, API, scraper y base de datos— para que
> cinco personas pudieran construir en paralelo sin bloquearse. Coordiné el avance del equipo y
> trabajé sobre cómo se presenta la información al lector.

---

## [Caso 4] Appointa — plataforma de gestión de turnos

**[Etiqueta]** Producto end-to-end · Equipo · Ámbito académico

**[Qué incluyó]**
> Un producto llevado de punta a punta: descubrimiento, iteraciones de desarrollo, pruebas con
> usuarios, un presupuesto de implementación a precio fijo y una demo final defendida ante un
> panel que asumía el rol de los actores interesados.

**[En el desarrollo]**
> Desarrollo guiado por especificación, auditorías de ciberseguridad, refactorización y
> pipelines de integración y despliegue continuos.

**[Por qué lo incluyo]**
> Presupuestar a precio fijo y defender una demo ante stakeholders enseña algo que el código
> solo no enseña: que un producto se sostiene por sus decisiones, no por su stack.

---

# 5 · CÓMO TRABAJO ⭐ (sección principal)

**[H2]**
> Cómo trabajo

**[Intro — 3 líneas]**
> Trabajo con un equipo de tres personas en un producto desde cero. Mi aporte principal no son
> líneas de código: es el sistema que nos permite desarrollar rápido, iterar con menos riesgo y
> sostener el ritmo sin quemarnos. Esto es lo que construimos para lograrlo.

### [Ítem 1]
**[Título]** Sistema de tickets con MCP propio
**[Cuerpo]**
> Empezamos con Linear. A los dos meses sus limitaciones nos obligaron a migrar el roadmap
> completo a Vikunja, con un servidor MCP personalizado. La migración la resolvimos con un
> puente MCP-API y después MCP-MCP.

### [Ítem 2]
**[Título]** Estándar de contribución con TDD y SDD
**[Cuerpo]**
> Un `CONTRIBUTING.md` orientado a implementaciones atómicas, con desarrollo guiado por tests y
> por especificación. Define cómo entra cada cambio al repositorio.

### [Ítem 3]
**[Título]** Documentación que se mantiene sola
**[Cuerpo]**
> Un `CLAUDE.md` que funciona como fuente de verdad del repositorio, actualizado por los agentes
> orquestadores cada vez que hay un cambio importante.

### [Ítem 4]
**[Título]** Diseño frontend con Figma como fuente de verdad
**[Cuerpo]**
> Subagentes y herramientas propias que leen el diseño directamente desde Figma, para reducir
> tokens de contexto y llamados de herramienta. Menos costo operativo por cada iteración.

### [Ítem 5]
**[Título]** Automatización del proceso, no solo del código
**[Cuerpo]**
> Un bot que vincula tickets con pull requests y actualiza su estado según la rama de merge.

**[Cierre de sección — destacado]**
> El resultado es un flujo orientado a agentes que nos permite desarrollar más rápido, iterar
> con menos riesgo y trabajar de forma más eficiente. Yo defino el problema, la arquitectura y
> los límites; los agentes implementan.

---

# 6 · LO QUE APRENDÍ

**[H2]**
> Lo que aprendí

**[Bajada]**
> Tres cosas que me cambiaron la forma de trabajar.

**[Cita 1]**
> Acelerar tareas que uno no domina no las acelera: las retrasa. Terminás trabajando sobre un
> nivel de abstracción más alto del que deberías.

**[Cita 1 — pie]**
> Exploré automatizar la gestión de proyectos con IA. Medí consumo de tokens y durabilidad de
> contexto, y decidí abandonarlo.

**[Cita 2]**
> Los usuarios ven el diseño nuevo. Nosotros vemos las horas en performance, arquitectura,
> migraciones y mantenimiento. Muchas veces es en ese trabajo invisible donde más se aprende.

**[Cita 3]**
> Cada vez escribo menos código repetitivo y dedico más tiempo a diseñar sistemas, anticipar
> fallas y entender al usuario. Eso me dejó ver cómo se configuran y se relacionan los sistemas,
> cómo planificar qué hacer cuando las cosas fallan —porque fallan—, y cómo los productos
> resuelven o complican los problemas de las personas.

---

# 7 · CONTACTO

**[H2]**
> Trabajemos juntos

**[Frase]**
> ¿Tenés un proyecto donde haga falta alguien que se haga cargo del problema completo, no solo
> de su parte técnica? Escribime.

**[Link 1]** Email — hernandez.joaquin346@gmail.com
**[Link 2]** LinkedIn — linkedin.com/in/joaquin-her
**[Link 3]** GitHub — github.com/joaquin-her

---

## 📎 Inventario de assets

| Asset | Estado | Dónde está |
|---|---|---|
| Diagrama de arquitectura (SVG) | ✅ Existe | `assets/mcp/architecture-dark.svg` — primera lámina del caso 1 |
| Capturas de los vaults (MCP) | ✅ Existen | `assets/mcp/` — vault de prueba y personal. Carrusel en el caso 1 |
| Diagrama del flujo de trabajo del equipo | ❌ Falta | Placeholder reservado en sección 5 — alto impacto visual |
| Capturas del showroom del cliente | ✅ Existen | `assets/syh/` — 5 capturas desktop + collage de 4 capturas mobile, autorizadas por el dueño. Carrusel en el caso 2 |
| Capturas de alethIA | ✅ Existen | `assets/alethia/` — 6 capturas de la demo + foto de equipo. Carrusel en el caso 3 |
| Láminas de Appointa | ✅ Existen | `assets/appointa/` — 4 láminas curadas del pitch deck (de 9 originales). Carrusel en el caso 4 |
| Foto personal | ✅ Existe | `assets/profile_img.png` — apertura (grande) |
| Favicon / marca personal | ❌ Falta | Provisorio: monograma "JH" en `petroleo-700` |

## 🔒 Datos que NO deben modificarse al diseñar

Son afirmaciones verificables. Se pueden acortar, pero no cambiar su sentido:
- "26 de sus 35 commits" y la aclaración de que partió de un proyecto open source.
- "7 USD/mes" y "100-110 usuarios activos".
- "200 fotos", "cuatro semanas", "menos de tres horas".
- "Seleccionado entre cientos de postulantes", "110 hackers", "36 horas".
- Los números de GitHub (7 años, 664 commits, 21 repos, 6 lenguajes).
- No nombrar el producto ni el equipo actual.
