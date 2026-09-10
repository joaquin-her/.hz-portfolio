'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/**
 * Deriva del fondo de la apertura.
 *
 * `FondoHero` dibuja el SVG y es componente de servidor: marcado puro, sin
 * razón para viajar al cliente. Este hermano —que no pinta nada— toma sus
 * grupos `[data-deriva-hero]` y les aplica el movimiento. Separarlos deja
 * el fondo en el primer HTML y le suma la animación al hidratar.
 *
 * Es deriva pura, sin scroll: la apertura ya se lee con el nombre y los
 * párrafos entrando por CSS, y un parallax acá competiría con eso.
 *
 * El nodo se busca desde el `<section>` padre porque el SVG no está en el
 * árbol de este componente. Se lee una sola vez, al montar.
 */
export default function AnimaHero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const seccion = ref.current?.closest('section');
      if (!seccion) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const formas = seccion.querySelectorAll('[data-deriva-hero]');

        for (const forma of formas) {
          const semilla = Number(forma.dataset.derivaHero);

          // Más lento y más corto que el fondo de las secciones de abajo:
          // acá el movimiento acompaña la lectura, no la interrumpe. Las
          // duraciones no son múltiplas entre sí, así que las formas no
          // vuelven a alinearse en todo el tiempo que dure la visita.
          gsap.to(forma, {
            xPercent: semilla % 2 === 0 ? 1.8 : -1.4,
            yPercent: semilla % 2 === 0 ? -1.2 : 1.6,
            rotation: semilla % 2 === 0 ? 0.8 : -0.6,
            transformOrigin: '50% 50%',
            duration: 18 + semilla * 4.3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            // Desfase negativo: cada forma arranca ya avanzada en su ciclo,
            // así ninguna sale de golpe en el primer cuadro.
            delay: -semilla * 3.1,
          });
        }
      });
    },
    { scope: ref }
  );

  return <div ref={ref} hidden aria-hidden="true" />;
}
