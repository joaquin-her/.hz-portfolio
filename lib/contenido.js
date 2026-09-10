// Fuente de verdad del copy del sitio.
// Espejo de web-contenido-final.md — los datos verificables no se modifican.

export const perfil = {
  nombre: 'Joaquín Hernández',
  ubicacion: 'Buenos Aires, Argentina',
  posicionamiento: 'Ingeniería de software con criterio de negocio.',
  parrafos: [
    'Estudio Ingeniería en Informática en la UBA. Me interesa el punto donde la tecnología toca el negocio: no el stack por el stack, sino qué problema resuelve, para quién y a qué costo.',
    'Trabajo con comunicación abierta y honestidad sobre el estado real de las cosas. Prefiero decir “esto todavía no funciona” antes que sostener una demo que no se banca. Y cuando algo no da resultado, lo mido, lo digo y lo dejo.',
    'Diseño y construyo productos de punta a punta, y el sistema de trabajo con el que un equipo desarrolla con IA. Hoy lo aplico junto a un equipo de tres personas en un producto desde cero.',
  ],
  chips: [
    'MCP server propio con OAuth 2.1 en producción',
    'Cliente freelance con producto activo',
    'Platanus Hack 26 — seleccionado entre cientos de postulantes',
  ],
};

export const navegacion = [
  { id: 'sobre-mi', num: '01', label: 'Sobre mí' },
  { id: 'trayectoria', num: '02', label: 'Trayectoria' },
  { id: 'capacidades', num: '03', label: 'Capacidades' },
  { id: 'proyectos', num: '04', label: 'Proyectos' },
  { id: 'como-trabajo', num: '05', label: 'Cómo trabajo' },
  { id: 'aprendizajes', num: '06', label: 'Lo que aprendí' },
  { id: 'contacto', num: '07', label: 'Contacto' },
];

export const trayectoria = [
  { destacado: '7 años', detalle: 'en GitHub · 664 commits · 21 repositorios públicos', grande: true },
  { destacado: '6 lenguajes', detalle: 'en proyectos reales', grande: true },
  { destacado: 'Ingeniería en Informática', detalle: 'UBA — estudiante regular', grande: false },
  { destacado: 'Escribo sobre lo que construyo', detalle: 'en LinkedIn', grande: false },
];

export const capacidades = [
  {
    grupo: 'Construyo con',
    items: 'TypeScript · React · Next.js · Python · FastAPI · Elixir / OTP · Java · SQL',
  },
  {
    grupo: 'Despliego y opero',
    items: 'Docker · Vercel · Railway · Render · Supabase · Neon · Cloudflare R2 · PostHog · CI/CD',
  },
  {
    grupo: 'IA aplicada',
    items: 'Servidores MCP propios · OAuth 2.1 para agentes · Subagentes y orquestación · Desarrollo guiado por especificación · LLMs locales (Ollama) · Figma como fuente de verdad',
  },
  {
    grupo: 'También trabajé con',
    items: 'C · C++ · Assembly x86 · Flutter · Terraform',
  },
];

export const idiomas = 'Español nativo · Inglés avanzado';

export const proyectos = [
  {
    num: '01',
    titulo: 'Obsidian Vault MCP',
    etiqueta: 'Infraestructura de IA · Proyecto propio · Open source (MIT)',
    ladoImagen: 'izquierda',
    laminas: [
      {
        src: '/assets/mcp/arquitectura.svg',
        ancho: 820,
        altoPx: 1120,
        alt: 'Diagrama de la arquitectura en cinco capas: cliente MCP, transportes stdio y Streamable HTTP con OAuth 2.1, el servidor MCP con sus tools, resources y prompts, el WebDAVService sobre un pool de conexiones, y los dos vaults desplegados en Koofr.',
        pie: 'Arquitectura — cinco capas, del cliente al vault',
        ajuste: 'contener',
      },
      {
        src: '/assets/mcp/vault-agente.webp',
        ancho: 1400,
        altoPx: 766,
        alt: 'Vista de grafo del vault de prueba en Obsidian, con los nodos creados por el agente',
        pie: 'Vault de prueba — la primera etapa del despliegue',
      },
      {
        src: '/assets/mcp/vault-personal.webp',
        ancho: 1400,
        altoPx: 743,
        alt: 'Vista de grafo del vault personal en Obsidian, con cientos de notas agrupadas por color',
        pie: 'Vault personal — años de notas, agrupadas por carpeta',
      },
    ],
    altoLamina: 420,
    parrafos: [
      'Quería conectar sesiones de Claude, sin contexto previo, con mi segundo cerebro en Obsidian, sin depender de un dispositivo. Lo uso en Windows, Linux y Android, sincronizado por WebDAV.',
      'Un servidor MCP que le da a los clientes de IA acceso de lectura y escritura sobre cualquier endpoint WebDAV. En la práctica: le cuento una idea a Claude y crea la carpeta y los documentos en mi vault. Más tarde, desde el editor, le digo “leé los documentos de ese proyecto e implementalo acá”.',
    ],
    cita: 'Me daba miedo que una ventana de contexto contaminada arruinara el segundo cerebro que llevo años construyendo. Por eso lo desplegué en dos etapas: primero un vault de prueba, después el personal.',
    detalles: [
      'OAuth 2.1 con PKCE y registro dinámico de clientes',
      'Migración de transporte local a HTTP remoto',
      'Soporte de archivos binarios y carga masiva',
      'Desplegado en Railway con Docker y volumen persistente',
      'Logging configurable por nivel, con trazas por herramienta',
    ],
    pie: 'Partí de un proyecto open source existente y aporté 26 de sus 35 commits.',
    link: {
      texto: 'github.com/joaquin-her/obsidian-vault-mcp',
      href: 'https://github.com/joaquin-her/obsidian-vault-mcp',
    },
  },
  {
    num: '02',
    titulo: 'Showroom e-commerce',
    etiqueta: 'Cliente real · En producción · Freelance',
    ladoImagen: 'derecha',
    laminas: [
      {
        src: '/assets/syh/inicio.webp',
        ancho: 1400,
        altoPx: 699,
        alt: 'Portada del showroom: título grande, llamados a la acción y contadores de catálogo',
        pie: 'Portada',
      },
      {
        src: '/assets/syh/catalogo.webp',
        ancho: 1400,
        altoPx: 714,
        alt: 'Catálogo completo con panel de filtros por categoría y tipo, y grilla de productos',
        pie: 'Catálogo con filtros',
      },
      {
        src: '/assets/syh/filtros.webp',
        ancho: 1400,
        altoPx: 702,
        alt: 'Resultados de búsqueda filtrados por liga y tipo, con productos marcados como agotados',
        pie: 'Búsqueda filtrada y estado de stock',
      },
      {
        src: '/assets/syh/admin-login.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Pantalla de login del panel de administración, con campos de email y contraseña',
        pie: 'Login del panel de administración',
      },
      {
        src: '/assets/syh/admin-panel.webp',
        ancho: 1400,
        altoPx: 704,
        alt: 'Panel de administración con la gestión de categorías y el listado de productos con precios y talles',
        pie: 'Gestión de categorías y productos',
      },
      {
        src: '/assets/syh/mobile.webp',
        ancho: 1400,
        altoPx: 719,
        alt: 'Cuatro capturas de la PWA en Android, en fila: portada, catálogo, detalle de producto con selector de talle y carrito con checkout por WhatsApp',
        pie: 'La PWA en Android — de la portada al carrito',
        ajuste: 'contener',
      },
    ],
    altoLamina: 340,
    actos: [
      {
        rotulo: 'Acto 1',
        texto: 'El emprendimiento de un amigo vendía por Instagram, y ahí tenía un techo: cuántos productos alcanzaba a ver un interesado por minuto. Necesitaba un espacio propio.',
      },
      {
        rotulo: 'Acto 2',
        texto: 'Un showroom a medida: catálogo personalizable, panel de administración, gestión con login y una PWA instalable en Android. De la idea al lanzamiento pasaron cuatro semanas, con demos y entregas semanales.',
      },
    ],
    dato: {
      valor: '7 USD',
      unidad: '/mes',
      texto: 'Costo total de infraestructura para el dueño, con capacidad para 100-110 usuarios activos. La arquitectura se eligió optimizando su costo, no mi comodidad.',
    },
    actoFinal: {
      rotulo: 'Acto 3',
      parrafos: [
        'Para el Mundial le propuse sumarle detalles temáticos a la interfaz. Él no sabe de diseño ni de código, así que le armé un proyecto en Stitch.ai para que hiciera su propia versión. Una llamada de treinta minutos para entender qué buscaba, y de ahí a producción: menos de tres horas en total.',
        'Pero el cambio trajo un problema de performance por el peso de las imágenes. Migré las 200 fotos del catálogo a WebP, con miniaturas y dimensiones según el contexto de uso.',
      ],
    },
    cita: 'La optimización me llevó más tiempo que el rediseño completo. El trabajo más importante suele ser el menos visible.',
  },
  {
    num: '03',
    titulo: 'alethIA — Platanus Hack 26',
    etiqueta: 'Equipo de 5 · 36 horas · Track “Future”',
    ladoImagen: 'izquierda',
    laminas: [
      {
        src: '/assets/alethia/portada.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Portada de ALETH·IA, con el llamado a explorar el mapa de noticias',
        pie: 'Portada — navegá la noticia como un mapa',
      },
      {
        src: '/assets/alethia/mapa-categorias.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Mapa de categorías de noticias, cada una con su cantidad de historias y nivel de discrepancia entre medios',
        pie: 'Mapa por categoría — cantidad de historias y discrepancia',
      },
      {
        src: '/assets/alethia/mapa-evento.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Zoom sobre un evento individual en el mapa, con su cantidad de medios y nivel de discrepancia',
        pie: 'Zoom a un hecho puntual dentro de la categoría',
      },
      {
        src: '/assets/alethia/detalle-verdad.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Vista de detalle de un hecho, con la sección "Verdad consensuada" listando los puntos en los que coinciden los medios',
        pie: 'Verdad consensuada — lo que los medios coinciden en reportar',
      },
      {
        src: '/assets/alethia/detalle-discrepancias.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Sección "Discrepancias entre medios", con comparaciones lado a lado de cómo distintos medios cubren el mismo punto',
        pie: 'Discrepancias — el mismo hecho, contado distinto',
      },
      {
        src: '/assets/alethia/detalle-fuentes.webp',
        ancho: 1400,
        altoPx: 697,
        alt: 'Listado de las catorce fuentes de noticias que componen el hecho, con medio, autor y fecha',
        pie: 'Fuentes originales del hecho',
      },
      {
        src: '/assets/alethia/equipo.webp',
        ancho: 1280,
        altoPx: 718,
        alt: 'El equipo de cinco personas en Platanus Hack 26, con las remeras del evento',
        pie: 'El equipo, en Platanus Hack 26',
      },
    ],
    altoLamina: 340,
    parrafos: [
      'Seleccionado entre cientos de postulantes para Platanus Hack 26 Buenos Aires: 110 hackers, 36 horas, cuatro tracks de IA, junto a Anthropic, ElevenLabs y Supabase.',
      'Una plataforma que recolecta los sucesos de Argentina, los agrupa por similitud y los presenta contrastando lo que dice cada medio: qué hay de consenso, qué versiones son mixtas y dónde aparecen las discrepancias.',
    ],
    cita: 'Centralizar todas las voces sobre un mismo hecho, para que el lector construya una verdad horizontal, libre del sesgo de una sola fuente.',
    rol: {
      rotulo: 'Mi rol',
      texto: 'Definí los contratos entre los servicios —interfaz, API, scraper y base de datos— para que cinco personas pudieran construir en paralelo sin bloquearse. Coordiné el avance del equipo y trabajé sobre cómo se presenta la información al lector.',
    },
  },
  {
    num: '04',
    titulo: 'Appointa — gestión de turnos',
    etiqueta: 'Producto end-to-end · Equipo · Ámbito académico',
    ladoImagen: 'derecha',
    laminas: [
      {
        src: '/assets/appointa/personalizacion.webp',
        ancho: 1400,
        altoPx: 785,
        alt: 'Lámina "Personalización por Rubro": formularios de reserva configurables para recolectar datos específicos según el profesional',
        pie: 'Formularios de reserva configurables por rubro',
      },
      {
        src: '/assets/appointa/multi-staff.webp',
        ancho: 1400,
        altoPx: 789,
        alt: 'Lámina "Escalabilidad Multi-Staff": gestión de múltiples profesionales bajo una misma cuenta, con agendas y métricas independientes',
        pie: 'Multi-staff — agendas y métricas por empleado',
      },
      {
        src: '/assets/appointa/autogestion.webp',
        ancho: 1400,
        altoPx: 789,
        alt: 'Lámina "Autogestión 24/7": reserva de turnos en tiempo real mediante un link único y público, sin intermediarios',
        pie: 'Autogestión 24/7 por link público',
      },
      {
        src: '/assets/appointa/confirmacion.webp',
        ancho: 1400,
        altoPx: 787,
        alt: 'Lámina "Confirmación Inmediata": notificación automática de confirmación de turno por WhatsApp',
        pie: 'Confirmación y recordatorio por WhatsApp',
      },
    ],
    altoLamina: 340,
    parrafos: [
      'Un producto llevado de punta a punta: descubrimiento, iteraciones de desarrollo, pruebas con usuarios, un presupuesto de implementación a precio fijo y una demo final defendida ante un panel que asumía el rol de los actores interesados.',
      'Desarrollo guiado por especificación, auditorías de ciberseguridad, refactorización y pipelines de integración y despliegue continuos.',
    ],
    cita: 'Presupuestar a precio fijo y defender una demo ante stakeholders enseña algo que el código solo no enseña: que un producto se sostiene por sus decisiones, no por su stack.',
  },
];

export const comoTrabajo = {
  intro:
    'Me gusta trabajar en equipo haciendo productos desde cero. Mi aporte principal no son líneas de código: es el sistema que nos permite desarrollar rápido, iterar con menos riesgo y sostener el ritmo sin quemarnos, para poder enfocar más esfuerzo en las operaciones e ideas de negocio. Para el ultimo equipo que trabajé esto es lo que construimos para lograrlo.',
  items: [
    {
      num: '01',
      titulo: 'Sistema de tickets con MCP propio',
      cuerpo:
        'Empezamos con Linear. A los dos meses sus limitaciones nos obligaron a migrar el roadmap completo a Vikunja, con un servidor MCP personalizado. La migración la resolvimos con un puente MCP-API y después MCP-MCP.',
    },
    {
      num: '02',
      titulo: 'Estándar de contribución con TDD y SDD',
      cuerpo: 'Un {code} orientado a implementaciones atómicas, con desarrollo guiado por tests y por especificación. Define cómo entra cada cambio al repositorio.',
      code: 'CONTRIBUTING.md',
    },
    {
      num: '03',
      titulo: 'Documentación que se mantiene sola',
      cuerpo: 'Un {code} que funciona como fuente de verdad del repositorio, actualizado por los agentes orquestadores cada vez que hay un cambio importante.',
      code: 'CLAUDE.md',
    },
    {
      num: '04',
      titulo: 'Diseño frontend con Figma como fuente de verdad',
      cuerpo:
        'Subagentes y herramientas propias que leen el diseño directamente desde Figma, para reducir tokens de contexto y llamados de herramienta. Menos costo operativo por cada iteración.',
    },
    {
      num: '05',
      titulo: 'Automatización del proceso, no solo del código',
      cuerpo: 'Un bot que vincula tickets con pull requests y actualiza su estado según la rama de merge.',
    },
  ],
  cierre:
    'El resultado es un flujo orientado a agentes que nos permite desarrollar más rápido, iterar con menos riesgo y trabajar de forma más eficiente. Yo defino el problema, la arquitectura y los límites; los agentes implementan.',
  // Dos diagramas en vez de uno: el recorrido completo daba una lamina
  // demasiado alta para leerse. El paso 6 es la bisagra —cierra el primero
  // y abre el segundo—, asi que aparece en los dos.
  diagramas: [
    {
      src: '/assets/flujo/flujo-desarrollo.svg',
      ancho: 1280,
      altoPx: 780,
      alt: 'Ciclo de desarrollo en seis pasos: la tarea con criterios de aceptacion verificables, tomarla y asignarsela, la rama que sale de integracion, trabajar corriendo un gate local que decide si se abre el pull request, el pull request a integracion revisado por otra persona, y la prueba del entorno de integracion desplegado.',
      pie: '1 · Ciclo de desarrollo — de la tarea al entorno de integracion',
      ajuste: 'contener',
    },
    {
      src: '/assets/flujo/flujo-despliegue.svg',
      ancho: 1280,
      altoPx: 1258,
      alt: 'Ciclo de despliegue: probado el entorno de integracion, el cambio cae en uno de cuatro desenlaces (falla fuerte y se vuelve atras a la ultima version estable o se abre un ticket de prioridad alta, anda pero mejorable y se deja abriendo otro ticket con las observaciones, anda sin observaciones y queda en revision hasta la demo, o pide cambios y vuelve a la rama). Despues viene la demo con stakeholders y la promocion selectiva a produccion por una rama puente que deja atras lo que todavia no sale.',
      pie: '2 · Ciclo de despliegue — de integracion a produccion',
      ajuste: 'contener',
    },
  ],
};

export const aprendizajes = {
  bajada: 'Tres cosas que me cambiaron la forma de trabajar.',
  citas: [
    {
      num: '01',
      texto:
        'Acelerar tareas que uno no domina no las acelera: las retrasa. Terminás trabajando sobre un nivel de abstracción más alto del que deberías.',
      pie: 'Exploré automatizar la gestión de proyectos con IA. Medí consumo de tokens y durabilidad de contexto, y decidí abandonarlo.',
    },
    {
      num: '02',
      texto:
        'Los usuarios ven el diseño nuevo. Nosotros vemos las horas en performance, arquitectura, migraciones y mantenimiento. Muchas veces es en ese trabajo invisible donde más se aprende.',
    },
    {
      num: '03',
      texto:
        'Cada vez escribo menos código repetitivo y dedico más tiempo a diseñar sistemas, anticipar fallas y entender al usuario. Eso me dejó ver cómo se configuran y se relacionan los sistemas, cómo planificar qué hacer cuando las cosas fallan —porque fallan—, y cómo los productos resuelven o complican los problemas de las personas.',
    },
  ],
};

export const contacto = {
  titulo: 'Trabajemos juntos',
  frase:
    '¿Tenés un proyecto donde haga falta alguien que se haga cargo del problema completo, no solo de su parte técnica? Escribime.',
  links: [
    { rotulo: 'Email', texto: 'hernandez.joaquin346@gmail.com', href: 'mailto:hernandez.joaquin346@gmail.com' },
    { rotulo: 'LinkedIn', texto: 'linkedin.com/in/joaquin-her', href: 'https://linkedin.com/in/joaquin-her' },
    { rotulo: 'GitHub', texto: 'github.com/joaquin-her', href: 'https://github.com/joaquin-her' },
  ],
};
