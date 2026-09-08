'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Revela su contenido al entrar en viewport.
 *
 * Variantes:
 *   subir     desplazamiento vertical amplio + escala (por defecto)
 *   izquierda entra desde la izquierda
 *   derecha   entra desde la derecha
 *   escala    crece desde el centro, sin desplazamiento
 *
 * Respeta prefers-reduced-motion: con esa preferencia el contenido
 * aparece de una, sin animar.
 */
export default function Reveal({
  children,
  delay = 0,
  variante = 'subir',
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (sinMovimiento) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? 'visible' : 'oculto'}
      data-variante={variante}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...props}
    >
      {children}
    </Tag>
  );
}
