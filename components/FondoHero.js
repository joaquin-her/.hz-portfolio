/**
 * Fondo de la sección de apertura.
 *
 * A diferencia de las capas del fondo general, esta vive dentro del
 * <section> y lo cubre por completo (100% de ancho y alto), así que
 * acompaña a la sección crezca lo que crezca.
 *
 * Es estático: no se desplaza con el scroll. El parallax queda para las
 * secciones de más abajo, donde no compite con la lectura del nombre y
 * los párrafos de apertura.
 */
export default function FondoHero() {
  return (
    <div className="hero-fondo" aria-hidden="true">
      <svg
        className="hero-fondo__svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hf-a" cx="30%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#3d5c68" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hf-b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#58717d" stopOpacity="0.10" />
          </linearGradient>
          <radialGradient id="hf-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <filter id="hf-suave" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>

        {/* Masa principal: sostiene la composición */}
        <g filter="url(#hf-suave)">
          <path
            d="M-140 300 C 180 90, 520 180, 760 320 S 1200 580, 1500 430 L 1580 -80 L -180 -80 Z"
            fill="url(#hf-a)"
          />
        </g>

        {/* Masa lateral y peso inferior izquierdo */}
        <g filter="url(#hf-suave)">
          <path
            d="M1560 240 C 1220 340, 1090 620, 1220 860 L 1560 980 Z"
            fill="url(#hf-b)"
          />
          <ellipse cx="180" cy="820" rx="420" ry="270" fill="#1e3a46" opacity="0.20" />
        </g>

        {/* Orbe */}
        <g filter="url(#hf-suave)">
          <circle cx="1050" cy="200" r="200" fill="url(#hf-c)" />
        </g>

        {/* Anillos */}
        <g fill="none" stroke="#1e3a46" strokeOpacity="0.22" strokeWidth="1.5">
          <ellipse cx="760" cy="480" rx="520" ry="330" />
          <ellipse cx="760" cy="480" rx="600" ry="390" />
        </g>

        {/* Trazos que cruzan */}
        <g fill="none" stroke="#182b31" strokeOpacity="0.20" strokeWidth="1.5">
          <path d="M-100 640 C 260 470, 620 700, 980 540 S 1400 300, 1560 420" />
          <path d="M-100 710 C 265 540, 628 772, 986 612 S 1405 372, 1560 492" />
        </g>
      </svg>
    </div>
  );
}
