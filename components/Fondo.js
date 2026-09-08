'use client';

import { useEffect, useRef } from 'react';

/**
 * Capa de fondo: formas orgánicas amplias en SVG.
 *
 * Vectores puros, sin imágenes: escalan a cualquier resolución y pesan poco.
 * Van detrás del contenido (z-index 0, el sitio va en 1) y son inertes al
 * puntero. Las masas están calibradas para leerse como forma —no como una
 * neblina— manteniendo el texto sobre zonas de contraste suficiente.
 *
 * Cada capa se desplaza con el scroll a su propia velocidad, de modo que
 * el movimiento sea claramente perceptible. Se apaga con
 * prefers-reduced-motion.
 *
 * La difuminación vive en los gradientes y no en un `feGaussianBlur`: un
 * filtro sobre una capa de este tamaño se rasteriza de nuevo cada vez que
 * cambia su transform —y eso es justo lo que hace el parallax en cada
 * cuadro—. Con gradientes, la composición queda en la GPU.
 *
 * La apertura tiene su propio fondo (FondoHero), que vive dentro de la
 * sección y la cubre por completo.
 */
export default function Fondo() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Los datos del DOM se leen una sola vez: dentro del bucle de scroll
    // solo queda aritmética y, cuando hace falta, una escritura.
    const capas = Array.from(el.querySelectorAll('[data-velocidad]')).map((nodo) => ({
      nodo,
      // Cada capa se mueve respecto de su propio punto de anclaje,
      // no del origen del documento: así el desfase no se acumula.
      velocidad: Number(nodo.dataset.velocidad),
      ancla: Number(nodo.dataset.ancla || 0),
      ultimo: null,
    }));
    let pendiente = false;

    const pintar = () => {
      pendiente = false;
      const y = window.scrollY;
      const alto = window.innerHeight;

      for (const capa of capas) {
        // Fuera de cuadro no hay nada que actualizar: la capa está tapada
        // por las secciones opacas o directamente fuera de la ventana.
        // Se usa la geometría medida fuera del bucle, para no forzar
        // recálculos de layout en cada cuadro de scroll.
        if (capa.arriba > y + alto * 1.5 || capa.arriba + capa.alto < y - alto * 0.5) {
          continue;
        }
        // Redondear al píxel evita reescribir el transform por diferencias
        // que no se ven, que es la mayor parte de los cuadros.
        const desplazamiento = Math.round((y - capa.ancla) * capa.velocidad);
        if (desplazamiento === capa.ultimo) continue;
        capa.ultimo = desplazamiento;
        capa.nodo.style.transform = `translate3d(-50%, ${desplazamiento}px, 0)`;
      }
    };

    // La geometría solo cambia al redimensionar, no al scrollear.
    const medir = () => {
      for (const capa of capas) {
        capa.arriba = capa.nodo.offsetTop;
        capa.alto = capa.nodo.offsetHeight;
      }
    };

    const alScrollear = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(pintar);
    };

    const alRedimensionar = () => {
      medir();
      pintar();
    };

    medir();
    pintar();
    window.addEventListener('scroll', alScrollear, { passive: true });
    window.addEventListener('resize', alRedimensionar);
    return () => {
      window.removeEventListener('scroll', alScrollear);
      window.removeEventListener('resize', alRedimensionar);
    };
  }, []);

  return (
    <div className="fondo" ref={ref} aria-hidden="true">
      {/* ── Capacidades: curva amplia que cruza el ancho ── */}
      <svg
        className="fondo__capa fondo__capa--capacidades"
        data-velocidad="-0.38"
        data-ancla="1900"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g-capacidades" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#58717d" stopOpacity="0.19" />
            <stop offset="100%" stopColor="#b4c3cc" stopOpacity="0.10" />
          </linearGradient>
          <radialGradient id="g-capacidades-b" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.26" />
            <stop offset="55%" stopColor="#182b31" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g>
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
        data-velocidad="0.34"
        data-ancla="4200"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="g-como-a" cx="22%" cy="42%" r="72%">
            <stop offset="0%" stopColor="#182b31" stopOpacity="0.44" />
            <stop offset="42%" stopColor="#1e3a46" stopOpacity="0.22" />
            <stop offset="74%" stopColor="#1e3a46" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#f4fefe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="g-como-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#3d5c68" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#58717d" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="g-como-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e3a46" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#1e3a46" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#1e3a46" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g>
          <ellipse cx="250" cy="410" rx="470" ry="370" fill="url(#g-como-a)" />
          <path
            d="M1320 80 C 1000 210, 890 490, 1020 720 S 1190 950, 1360 900 Z"
            fill="url(#g-como-b)"
          />
          <ellipse cx="700" cy="840" rx="500" ry="190" fill="url(#g-como-c)" />
        </g>

        <g fill="none" stroke="#182b31" strokeOpacity="0.16" strokeWidth="1.5">
          <ellipse cx="250" cy="410" rx="410" ry="320" />
          <ellipse cx="250" cy="410" rx="472" ry="372" />
        </g>
      </svg>
    </div>
  );
}
