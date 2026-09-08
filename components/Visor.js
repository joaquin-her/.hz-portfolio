'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ruta } from '@/lib/rutas';

/** Chevron trazado, hereda el color del botón. */
function Flecha({ direccion }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

/** Cruz de cierre. */
function Cruz() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  );
}

/**
 * Visor a pantalla completa para las capturas.
 *
 * Se abre al hacer clic en una lámina del carrusel y muestra la imagen
 * entera sobre un fondo desenfocado. Comparte la lógica circular del
 * carrusel: las flechas dan la vuelta al llegar a los extremos.
 *
 * Cierra con la X, con Escape o al hacer clic fuera de la imagen. El
 * foco queda atrapado dentro del visor mientras está abierto, y vuelve
 * al elemento que lo abrió al cerrarse.
 *
 * Se monta en el <body> mediante un portal: dentro del árbol de la
 * sección, el `will-change` de las animaciones de scroll crea un
 * containing block y el `position: fixed` se anclaría a la sección en
 * lugar de a la ventana.
 */
export default function Visor({ laminas, indice, onCerrar, onMover }) {
  const cajaRef = useRef(null);
  const cierreRef = useRef(null);
  const focoPrevio = useRef(null);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  const lamina = laminas[indice];
  const unica = laminas.length === 1;

  // Guarda el foco de origen y lo devuelve al cerrar.
  useEffect(() => {
    focoPrevio.current = document.activeElement;
    return () => {
      if (focoPrevio.current instanceof HTMLElement) focoPrevio.current.focus();
    };
  }, []);

  // El foco entra al visor recién cuando el portal está en el DOM.
  useEffect(() => {
    if (montado) cierreRef.current?.focus();
  }, [montado]);

  // Bloquea el scroll del fondo mientras el visor está abierto.
  useEffect(() => {
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previo;
    };
  }, []);

  const alTeclear = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCerrar();
        return;
      }
      if (unica) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onMover(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onMover(-1);
      }
    },
    [onCerrar, onMover, unica]
  );

  // Atrapa el foco: Tab circula solo entre los controles del visor.
  const alTabular = (e) => {
    if (e.key !== 'Tab') return;
    const focusables = cajaRef.current?.querySelectorAll('button');
    if (!focusables?.length) return;

    const primero = focusables[0];
    const ultimo = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === primero) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', alTeclear);
    return () => document.removeEventListener('keydown', alTeclear);
  }, [alTeclear]);

  if (!montado) return null;

  return createPortal(
    <div
      ref={cajaRef}
      className="visor"
      role="dialog"
      aria-modal="true"
      aria-label={lamina.pie || 'Captura ampliada'}
      onClick={onCerrar}
      onKeyDown={alTabular}
    >
      <button
        ref={cierreRef}
        type="button"
        className="visor__cerrar"
        onClick={onCerrar}
        aria-label="Cerrar"
      >
        <Cruz />
      </button>

      {!unica && (
        <>
          <button
            type="button"
            className="visor__flecha visor__flecha--previa"
            onClick={(e) => {
              e.stopPropagation();
              onMover(-1);
            }}
            aria-label="Captura anterior"
          >
            <Flecha direccion="izquierda" />
          </button>
          <button
            type="button"
            className="visor__flecha visor__flecha--siguiente"
            onClick={(e) => {
              e.stopPropagation();
              onMover(1);
            }}
            aria-label="Captura siguiente"
          >
            <Flecha direccion="derecha" />
          </button>
        </>
      )}

      {/* El clic sobre la imagen no cierra: solo el fondo */}
      <figure className="visor__contenido" onClick={(e) => e.stopPropagation()}>
        <Image
          key={lamina.src}
          src={ruta(lamina.src)}
          alt={lamina.alt}
          width={lamina.ancho}
          height={lamina.altoPx}
          className="visor__img"
          sizes="92vw"
        />
        <figcaption className="visor__pie">
          <span>{lamina.pie}</span>
          {!unica && (
            <span className="visor__contador">
              {indice + 1} / {laminas.length}
            </span>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}
