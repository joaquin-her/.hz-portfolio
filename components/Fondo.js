'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Capa de fondo: formas orgánicas amplias en SVG.
 *
 * Vectores puros, sin imágenes: escalan a cualquier resolución y pesan poco.
 * Van detrás del contenido (z-index 0, el sitio va en 1) y son inertes al
 * puntero. Las masas están calibradas para leerse como forma —no como una
 * neblina— manteniendo el texto sobre zonas de contraste suficiente.
 *
 * El movimiento tiene dos componentes que se suman sin pisarse:
 *
 *   1. Parallax de scroll — cada capa se desplaza a su propia velocidad,
 *      vía ScrollTrigger con `scrub`. GSAP interpola hacia la posición de
 *      scroll en vez de saltar a ella, así que el desplazamiento llega
 *      suavizado sin que haya que amortiguarlo a mano.
 *   2. Deriva continua — las formas de dentro de cada SVG (`[data-deriva]`)
 *      flotan en bucle con duraciones primas entre sí, de modo que la
 *      combinación no repite un patrón reconocible.
 *
 * Los dos actúan sobre nodos distintos: el scroll mueve `.fondo__capa`, la
 * deriva mueve los grupos de adentro. Ninguna animación de GSAP escribe
 * sobre la misma propiedad del mismo elemento que otra, que es lo que
 * provocaría tirones.
 *
 * La difuminación vive en los gradientes y no en un `feGaussianBlur`: un
 * filtro sobre una capa de este tamaño se rasteriza de nuevo cada vez que
 * cambia su transform —y eso es justo lo que hace el parallax en cada
 * cuadro—. Con gradientes, la composición queda en la GPU.
 *
 * Con `prefers-reduced-motion` no se crea ninguna animación: lo único que
 * se aplica es el `xPercent: -50` del centrado, que es posición y no
 * movimiento. `matchMedia` de GSAP revierte lo creado bajo la condición
 * contraria si la preferencia cambia en caliente.
 *
 * La apertura tiene su propio fondo (FondoHero), que vive dentro de la
 * sección y la cubre por completo.
 */
export default function Fondo() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const capas = gsap.utils.toArray('[data-velocidad]');

      // El centrado horizontal se aplica siempre, fuera de toda condición
      // de movimiento: `left: 50%` en el CSS corre la capa media ventana y
      // este `xPercent: -50` la devuelve media capa. Va acá y no en el CSS
      // porque GSAP reescribe el `transform` entero al animar, y un
      // centrado declarado allá se perdería en el primer cuadro. Si viviera
      // dentro del bloque de `matchMedia`, con `prefers-reduced-motion`
      // nunca llegaría a aplicarse y la capa quedaría corrida.
      gsap.set(capas, { xPercent: -50 });

      // `matchMedia` deja la preferencia de movimiento como una condición
      // más: si el usuario la cambia sin recargar, GSAP revierte lo creado
      // aquí sin dejar transforms residuales.
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        for (const capa of capas) {
          const velocidad = Number(capa.dataset.velocidad);

          // El recorrido se calcula en función del alto de la ventana, no
          // de una constante: en pantallas altas la capa tiene que viajar
          // más para que el desfase se lea igual. Va como función para que
          // ScrollTrigger lo reevalúe en cada refresh (resize, fuentes).
          gsap.fromTo(
            capa,
            { yPercent: -velocidad * 12 },
            {
              yPercent: velocidad * 12,
              ease: 'none',
              scrollTrigger: {
                trigger: capa,
                // La capa entra en juego desde antes de asomar y sigue
                // hasta bien pasada: el tramo visible cae en el medio del
                // recorrido, donde el desplazamiento es más parejo.
                start: 'top bottom',
                end: 'bottom top',
                // Un scrub numérico suaviza el seguimiento y, de paso,
                // recorta trabajo en scrolls rápidos: la capa no tiene que
                // pintar cada posición intermedia, solo alcanzarla.
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        // ── Deriva continua ──────────────────────────────────────────
        // Independiente del scroll: el fondo respira aunque la página
        // esté quieta. Cada forma lleva su propio ritmo, sembrado desde
        // `data-deriva`, para que no se sincronicen entre sí.
        const formas = gsap.utils.toArray('[data-deriva]');

        for (const forma of formas) {
          const semilla = Number(forma.dataset.deriva);
          // Duraciones deliberadamente no múltiplas: el ciclo conjunto
          // tarda muchísimo en repetirse y el movimiento no se vuelve
          // previsible.
          const duracion = 14 + semilla * 3.7;
          const amplitud = 10 + semilla * 4;

          gsap.to(forma, {
            xPercent: semilla % 2 === 0 ? amplitud * 0.4 : -amplitud * 0.4,
            yPercent: semilla % 2 === 0 ? -amplitud * 0.3 : amplitud * 0.3,
            rotation: semilla % 2 === 0 ? 1.6 : -1.6,
            // El origen al centro evita que la rotación arrastre la forma
            // hacia una esquina.
            transformOrigin: '50% 50%',
            duration: duracion,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            // Arrancar desfasado impide el golpe de todas las formas
            // saliendo a la vez en el primer cuadro.
            delay: -semilla * 2.3,
          });
        }
      });
    },
    { scope: ref }
  );

  return (
    <div className="fondo" ref={ref} aria-hidden="true">
      {/* ── Capacidades: curva amplia que cruza el ancho ── */}
      <svg
        className="fondo__capa fondo__capa--capacidades"
        data-velocidad="-0.38"
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

        <g data-deriva="0">
          <path
            d="M-100 470 C 230 290, 400 570, 720 420 S 1130 190, 1330 320 L 1330 780 L -100 780 Z"
            fill="url(#g-capacidades)"
          />
        </g>
        <g data-deriva="1">
          <circle cx="1050" cy="170" r="220" fill="url(#g-capacidades-b)" />
        </g>

        <g
          data-deriva="2"
          fill="none"
          stroke="#1e3a46"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        >
          <path d="M-80 440 C 240 265, 405 540, 725 393 S 1130 165, 1320 292" />
          <path d="M-80 505 C 245 330, 412 604, 730 458 S 1135 232, 1325 358" />
        </g>
      </svg>

      {/* ── Cómo trabajo: la masa más densa, la sección más importante ── */}
      <svg
        className="fondo__capa fondo__capa--como"
        data-velocidad="0.34"
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

        <g data-deriva="3">
          <ellipse cx="250" cy="410" rx="470" ry="370" fill="url(#g-como-a)" />
        </g>
        <g data-deriva="4">
          <path
            d="M1320 80 C 1000 210, 890 490, 1020 720 S 1190 950, 1360 900 Z"
            fill="url(#g-como-b)"
          />
        </g>
        <g data-deriva="5">
          <ellipse cx="700" cy="840" rx="500" ry="190" fill="url(#g-como-c)" />
        </g>

        <g
          data-deriva="6"
          fill="none"
          stroke="#182b31"
          strokeOpacity="0.16"
          strokeWidth="1.5"
        >
          <ellipse cx="250" cy="410" rx="410" ry="320" />
          <ellipse cx="250" cy="410" rx="472" ry="372" />
        </g>
      </svg>
    </div>
  );
}
