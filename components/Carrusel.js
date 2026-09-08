'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ruta } from '@/lib/rutas';

/** Chevron trazado, hereda el color del botón. */
function Flecha({ direccion }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direccion === 'izquierda' ? 'M15 6 L9 12 L15 18' : 'M9 6 L15 12 L9 18'} />
    </svg>
  );
}

/**
 * Carrusel de capturas, deslizable con el dedo.
 *
 * Usa scroll nativo con scroll-snap: el gesto táctil, la rueda y el
 * trackpad funcionan sin librería ni handlers de arrastre. El índice
 * activo se deduce observando cuál lámina está centrada.
 *
 * Las flechas laterales y el teclado avanzan en círculo: después de la
 * última lámina se vuelve a la primera.
 *
 * Accesible por teclado: flechas izquierda/derecha sobre el carrusel,
 * y flechas y puntos son botones reales.
 */
export default function Carrusel({ laminas, alto = 320 }) {
  const pistaRef = useRef(null);
  const [activa, setActiva] = useState(0);

  // Detecta la lámina centrada mientras se desliza.
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.indice);
            if (!Number.isNaN(i)) setActiva(i);
          }
        });
      },
      { root: pista, threshold: 0.6 }
    );

    const items = pista.querySelectorAll('[data-indice]');
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [laminas.length]);

  const irA = useCallback((i) => {
    const pista = pistaRef.current;
    if (!pista) return;
    const destino = pista.querySelector(`[data-indice="${i}"]`);
    if (!destino) return;

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    pista.scrollTo({
      left: destino.offsetLeft - pista.offsetLeft,
      behavior: sinMovimiento ? 'auto' : 'smooth',
    });
  }, []);

  // Avanza en círculo: después de la última vuelve a la primera.
  const mover = useCallback(
    (paso) => {
      const total = laminas.length;
      irA((activa + paso + total) % total);
    },
    [activa, irA, laminas.length]
  );

  const alTeclear = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      mover(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      mover(-1);
    }
  };

  const unica = laminas.length === 1;

  return (
    <figure className="carrusel">
      <div className="carrusel__marco">
        {!unica && (
          <>
            <button
              type="button"
              className="carrusel__flecha carrusel__flecha--previa"
              onClick={() => mover(-1)}
              aria-label="Captura anterior"
            >
              <Flecha direccion="izquierda" />
            </button>
            <button
              type="button"
              className="carrusel__flecha carrusel__flecha--siguiente"
              onClick={() => mover(1)}
              aria-label="Captura siguiente"
            >
              <Flecha direccion="derecha" />
            </button>
          </>
        )}

      <div
        ref={pistaRef}
        className="carrusel__pista"
        style={{ '--alto-lamina': `${alto}px` }}
        tabIndex={0}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Capturas del proyecto"
        onKeyDown={alTeclear}
      >
        {laminas.map((lamina, i) => (
          <div
            key={lamina.src}
            className="carrusel__lamina"
            data-indice={i}
            role="group"
            aria-roledescription="lámina"
            aria-label={`${i + 1} de ${laminas.length}`}
          >
            <Image
              src={ruta(lamina.src)}
              alt={lamina.alt}
              width={lamina.ancho}
              height={lamina.altoPx}
              className={`carrusel__img${
                lamina.ajuste === 'contener' ? ' carrusel__img--contenida' : ''
              }`}
              sizes="(max-width: 980px) 100vw, 50vw"
            />
            {lamina.pie && <figcaption className="carrusel__pie">{lamina.pie}</figcaption>}
          </div>
        ))}
      </div>
      </div>

      {!unica && (
        <div className="carrusel__control">
          <div className="carrusel__puntos" role="tablist" aria-label="Elegir captura">
            {laminas.map((lamina, i) => (
              <button
                key={lamina.src}
                type="button"
                role="tab"
                aria-selected={i === activa}
                aria-label={lamina.pie || `Captura ${i + 1}`}
                className={`carrusel__punto${i === activa ? ' es-activo' : ''}`}
                onClick={() => irA(i)}
              />
            ))}
          </div>
          <span className="carrusel__contador">
            {activa + 1} / {laminas.length}
          </span>
        </div>
      )}
    </figure>
  );
}
