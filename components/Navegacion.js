'use client';

import { useEffect, useState } from 'react';
import Marca from '@/components/Marca';
import { navegacion, perfil } from '@/lib/contenido';

/**
 * Barra de navegación fija.
 *
 * En desktop muestra los enlaces en línea y resalta la sección visible.
 * Bajo 860px colapsa a un botón hamburguesa que abre un panel a pantalla
 * completa. El panel se cierra con Escape, al elegir un destino, o al
 * volver a ancho de escritorio.
 */
export default function Navegacion() {
  const [abierto, setAbierto] = useState(false);
  const [compacta, setCompacta] = useState(false);
  const [activa, setActiva] = useState('');

  // La barra se vuelve compacta apenas se sale de la apertura.
  useEffect(() => {
    const alScrollear = () => setCompacta(window.scrollY > 120);
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  // Resalta el enlace de la sección que se está mirando.
  useEffect(() => {
    const secciones = navegacion
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!secciones.length) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibles.length) setActiva(visibles[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Escape cierra el panel; volver a desktop también.
  useEffect(() => {
    if (!abierto) return;

    const alTeclear = (e) => {
      if (e.key === 'Escape') setAbierto(false);
    };
    const consulta = window.matchMedia('(min-width: 861px)');
    const alRedimensionar = (e) => {
      if (e.matches) setAbierto(false);
    };

    document.addEventListener('keydown', alTeclear);
    consulta.addEventListener('change', alRedimensionar);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', alTeclear);
      consulta.removeEventListener('change', alRedimensionar);
      document.body.style.overflow = '';
    };
  }, [abierto]);

  return (
    <>
      <header className={`barra${compacta ? ' barra--compacta' : ''}`}>
        <a className="barra__marca" href="#sobre-mi">
          <Marca className="barra__marca-icono" />
          <span className="barra__nombre">{perfil.nombre}</span>
        </a>

        <nav className="barra__enlaces" aria-label="Secciones del sitio">
          {navegacion.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={activa === s.id ? 'es-activa' : undefined}
              aria-current={activa === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a className="barra__cta" href="#contacto">
          Hablemos
        </a>

        <button
          type="button"
          className={`burger${abierto ? ' burger--abierto' : ''}`}
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="panel-navegacion"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      <div
        id="panel-navegacion"
        className={`panel${abierto ? ' panel--abierto' : ''}`}
        hidden={!abierto}
      >
        <nav className="panel__enlaces" aria-label="Secciones del sitio">
          {navegacion.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setAbierto(false)}
              style={{ transitionDelay: `${60 + i * 45}ms` }}
            >
              <span className="panel__num">{s.num}</span>
              {s.label}
            </a>
          ))}
        </nav>

        <a
          className="panel__cta"
          href="#contacto"
          onClick={() => setAbierto(false)}
        >
          Hablemos de tu proyecto
        </a>
      </div>
    </>
  );
}
