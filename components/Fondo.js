/**
 * Capa de fondo: formas orgánicas amplias en SVG.
 *
 * Vectores puros, sin imágenes: escalan a cualquier resolución y pesan poco.
 * Van detrás de todo el contenido (z-index 0, el sitio va en 1) y son
 * inertes al puntero. La opacidad es deliberadamente baja: dan profundidad
 * sin competir con el texto ni afectar el contraste de lectura.
 */
export default function Fondo() {
  return (
    <div className="fondo" aria-hidden="true">
      {/* ── Apertura: masa cálida detrás del retrato y el nombre ── */}
      <svg
        className="fondo__capa fondo__capa--apertura"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="g-apertura-a" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.20" />
            <stop offset="60%" stopColor="#58717d" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g-apertura-b" cx="70%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <filter id="suave-a" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>

        <g filter="url(#suave-a)">
          <path
            d="M-80 210 C 180 60, 430 130, 610 250 S 980 470, 1180 360 L 1260 -60 L -120 -60 Z"
            fill="url(#g-apertura-a)"
          />
          <ellipse cx="880" cy="520" rx="440" ry="300" fill="url(#g-apertura-b)" />
          <ellipse cx="180" cy="700" rx="360" ry="240" fill="#58717d" opacity="0.06" />
        </g>
      </svg>

      {/* ── Capacidades: curva amplia que cruza el ancho ── */}
      <svg
        className="fondo__capa fondo__capa--capacidades"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g-capacidades" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.13" />
            <stop offset="100%" stopColor="#b4c3cc" stopOpacity="0.05" />
          </linearGradient>
          <filter id="suave-b" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>

        <g filter="url(#suave-b)">
          <path
            d="M-100 460 C 220 300, 380 560, 700 420 S 1120 200, 1320 320 L 1320 760 L -100 760 Z"
            fill="url(#g-capacidades)"
          />
          <circle cx="1040" cy="180" r="230" fill="#58717d" opacity="0.055" />
        </g>
      </svg>

      {/* ── Cómo trabajo: masa densa, la sección más importante ── */}
      <svg
        className="fondo__capa fondo__capa--como"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="g-como-a" cx="25%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="g-como-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </linearGradient>
          <filter id="suave-c" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>

        <g filter="url(#suave-c)">
          <ellipse cx="260" cy="420" rx="480" ry="380" fill="url(#g-como-a)" />
          <path
            d="M1300 100 C 1000 220, 900 480, 1020 700 S 1180 940, 1340 900 Z"
            fill="url(#g-como-b)"
          />
          <ellipse cx="700" cy="820" rx="520" ry="200" fill="#58717d" opacity="0.05" />
        </g>
      </svg>
    </div>
  );
}
