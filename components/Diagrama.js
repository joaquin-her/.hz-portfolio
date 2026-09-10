'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import Visor from '@/components/Visor';
import { ruta } from '@/lib/rutas';

/**
 * Diagramas ampliables, apilados.
 *
 * El carrusel ya resuelve algo parecido para las capturas de proyectos,
 * pero ahí las láminas son alternativas de una misma cosa y se muestran
 * de a una. Acá son dos mitades de un recorrido que se leen en orden, así
 * que van apiladas y visibles a la vez.
 *
 * Reusa el mismo `Visor` —que se monta en el body con un portal, atrapa
 * el foco y bloquea el scroll—, así el lightbox se comporta igual en todo
 * el sitio. Ampliado se puede saltar de un diagrama al otro sin cerrar.
 */
export default function Diagrama({ laminas }) {
  const [ampliada, setAmpliada] = useState(null);

  // Navegación circular entre diagramas, igual que en el carrusel.
  const mover = useCallback(
    (paso) => {
      setAmpliada((i) => (i + paso + laminas.length) % laminas.length);
    },
    [laminas.length]
  );

  return (
    <div className="diagramas">
      {laminas.map((lamina, i) => (
        <figure className="diagrama" key={lamina.src}>
          <button
            type="button"
            className="diagrama__lupa"
            onClick={() => setAmpliada(i)}
            aria-label={`Ampliar: ${lamina.pie || lamina.alt}`}
          >
            <Image
              src={ruta(lamina.src)}
              alt={lamina.alt}
              width={lamina.ancho}
              height={lamina.altoPx}
              className="diagrama__img"
              sizes="(max-width: 980px) 100vw, 40vw"
            />
            <span className="diagrama__indicio" aria-hidden="true">
              Ampliar
            </span>
          </button>

          {lamina.pie && <figcaption className="diagrama__pie">{lamina.pie}</figcaption>}
        </figure>
      ))}

      {ampliada !== null && (
        <Visor
          laminas={laminas}
          indice={ampliada}
          onCerrar={() => setAmpliada(null)}
          onMover={mover}
        />
      )}
    </div>
  );
}
