/**
 * Capa de fondo: formas orgánicas amplias en SVG.
 *
 * Vectores puros, sin imágenes: escalan a cualquier resolución y pesan poco.
 * Van detrás del contenido (z-index 0, el sitio va en 1) y son inertes al
 * puntero. Las masas están calibradas para leerse como forma —no como una
 * neblina— manteniendo el texto sobre zonas de contraste suficiente.
 */
export default function Fondo() {
  return (
    <div className="fondo" aria-hidden="true">
      {/* ── Apertura: masa densa detrás del retrato y el nombre ── */}
      <svg
        className="fondo__capa fondo__capa--apertura"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="g-apertura-a" cx="32%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.52" />
            <stop offset="45%" stopColor="#3d5c68" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="g-apertura-b" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#58717d" stopOpacity="0.10" />
          </linearGradient>
          <filter id="suave-a" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
        </defs>

        <g filter="url(#suave-a)">
          <path
            d="M-80 240 C 190 60, 450 140, 640 270 S 1000 500, 1200 380 L 1280 -60 L -120 -60 Z"
            fill="url(#g-apertura-a)"
          />
          <path
            d="M1280 300 C 1020 380, 940 620, 1040 820 L 1280 900 Z"
            fill="url(#g-apertura-b)"
          />
          <ellipse cx="200" cy="740" rx="380" ry="250" fill="#1e3a46" opacity="0.17" />
          <circle cx="820" cy="180" r="120" fill="#182b31" opacity="0.13" />
        </g>

        {/* Contornos finos: dan borde a las masas y refuerzan el carácter vectorial */}
        <g fill="none" stroke="#1e3a46" strokeOpacity="0.20" strokeWidth="1.5">
          <path d="M-60 300 C 200 130, 460 205, 660 330 S 1010 555, 1210 440" />
          <path d="M-60 360 C 210 195, 470 268, 668 392 S 1020 612, 1215 500" />
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
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.44" />
            <stop offset="55%" stopColor="#58717d" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#b4c3cc" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="g-capacidades-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <filter id="suave-b" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="38" />
          </filter>
        </defs>

        <g filter="url(#suave-b)">
          <path
            d="M-100 470 C 230 290, 400 570, 720 420 S 1130 190, 1330 320 L 1330 780 L -100 780 Z"
            fill="url(#g-capacidades)"
          />
          <circle cx="1050" cy="170" r="220" fill="url(#g-capacidades-b)" />
        </g>

        <g fill="none" stroke="#1e3a46" strokeOpacity="0.18" strokeWidth="1.5">
          <path d="M-80 440 C 240 265, 405 540, 725 393 S 1130 165, 1320 292" />
          <path d="M-80 505 C 245 330, 412 604, 730 458 S 1135 232, 1325 358" />
        </g>
      </svg>

      {/* ── Cómo trabajo: la masa más densa, la sección más importante ── */}
      <svg
        className="fondo__capa fondo__capa--como"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="g-como-a" cx="22%" cy="42%" r="68%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.50" />
            <stop offset="50%" stopColor="#1e3a46" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="g-como-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#58717d" stopOpacity="0.08" />
          </linearGradient>
          <filter id="suave-c" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="44" />
          </filter>
        </defs>

        <g filter="url(#suave-c)">
          <ellipse cx="250" cy="410" rx="470" ry="370" fill="url(#g-como-a)" />
          <path
            d="M1320 80 C 1000 210, 890 490, 1020 720 S 1190 950, 1360 900 Z"
            fill="url(#g-como-b)"
          />
          <ellipse cx="700" cy="840" rx="500" ry="190" fill="#1e3a46" opacity="0.15" />
        </g>

        <g fill="none" stroke="#182b31" strokeOpacity="0.16" strokeWidth="1.5">
          <ellipse cx="250" cy="410" rx="410" ry="320" />
          <ellipse cx="250" cy="410" rx="472" ry="372" />
        </g>
      </svg>
    </div>
  );
}
