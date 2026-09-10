import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Fondo from '@/components/Fondo';
import FondoHero from '@/components/FondoHero';
import AnimaHero from '@/components/AnimaHero';
import Navegacion from '@/components/Navegacion';
import Marca from '@/components/Marca';
import Carrusel from '@/components/Carrusel';
import Formulario from '@/components/Formulario';
import Diagrama from '@/components/Diagrama';
import { ruta } from '@/lib/rutas';
import {
  aprendizajes,
  capacidades,
  comoTrabajo,
  contacto,
  idiomas,
  navegacion,
  perfil,
  proyectos,
  trayectoria,
} from '@/lib/contenido';

/** Reemplaza el marcador {code} del contenido por un <code> real. */
function ConCodigo({ texto, code }) {
  if (!code) return texto;
  const [antes, despues] = texto.split('{code}');
  return (
    <>
      {antes}
      <code>{code}</code>
      {despues}
    </>
  );
}

function Marco({ imagen }) {
  const disponible = imagen.estado === 'disponible';
  return (
    <div className="marco" style={{ minHeight: imagen.alto }}>
      <span className="marco__estado">
        {disponible ? 'Asset disponible' : 'Placeholder · asset pendiente'}
      </span>
      <span className="marco__texto">
        {imagen.titulo}
        {imagen.archivo && (
          <>
            <br />
            <span className="marco__archivo">{imagen.archivo}</span>
          </>
        )}
      </span>
    </div>
  );
}

function Caso({ proyecto, indice }) {
  const { ladoImagen, imagen, laminas } = proyecto;

  const cuerpo = (
    <div
      className={`caso__cuerpo caso__cuerpo--${
        ladoImagen === 'izquierda' ? 'derecha' : 'izquierda'
      }`}
    >
      <span className="caso__etiqueta">
        {proyecto.num} · {proyecto.etiqueta}
      </span>
      <h3 className="caso__titulo">{proyecto.titulo}</h3>

      {proyecto.parrafos?.map((p, i) => (
        <p key={i} className="parrafo">
          {p}
        </p>
      ))}

      {proyecto.actos && (
        <div className="actos">
          {proyecto.actos.map((acto) => (
            <div key={acto.rotulo} className="acto">
              <span className="acto__rotulo">{acto.rotulo}</span>
              <p className="parrafo">{acto.texto}</p>
            </div>
          ))}

          {proyecto.dato && (
            <div className="dato-destacado">
              <span className="dato-destacado__valor">
                {proyecto.dato.valor}
                <span className="dato-destacado__unidad">{proyecto.dato.unidad}</span>
              </span>
              <span className="dato-destacado__texto">{proyecto.dato.texto}</span>
            </div>
          )}

          {proyecto.actoFinal && (
            <div className="acto">
              <span className="acto__rotulo">{proyecto.actoFinal.rotulo}</span>
              <div className="acto__cuerpo">
                {proyecto.actoFinal.parrafos.map((p, i) => (
                  <p key={i} className="parrafo">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {proyecto.cita && <blockquote className="cita">{proyecto.cita}</blockquote>}

      {proyecto.detalles && (
        <ul className="detalles">
          {proyecto.detalles.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}

      {proyecto.rol && (
        <div className="acto">
          <span className="acto__rotulo">{proyecto.rol.rotulo}</span>
          <p className="parrafo">{proyecto.rol.texto}</p>
        </div>
      )}

      {proyecto.pie && <p className="caso__pie">{proyecto.pie}</p>}

      {proyecto.link && (
        <a
          className="caso__link"
          href={proyecto.link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {proyecto.link.texto}
        </a>
      )}
    </div>
  );

  let marco = <div />;
  if (laminas) {
    marco = (
      <div className="caso__marco-wrap">
        <Carrusel laminas={laminas} alto={proyecto.altoLamina} />
      </div>
    );
  } else if (imagen) {
    marco = (
      <div className="caso__marco-wrap">
        <Marco imagen={imagen} />
      </div>
    );
  }

  const nodo = (
    <div className="caso__nodo">
      <span />
    </div>
  );

  return (
    <Reveal
      className="caso"
      delay={indice * 60}
      variante={ladoImagen === 'izquierda' ? 'izquierda' : 'derecha'}
    >
      {ladoImagen === 'izquierda' ? (
        <>
          {marco}
          {nodo}
          {cuerpo}
        </>
      ) : (
        <>
          {cuerpo}
          {nodo}
          {marco}
        </>
      )}
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Navegacion />
      <Fondo />

      <main className="sitio">
        {/* ══ 1 · Apertura (Sobre mí) ══ */}
        <section className="seccion apertura" id="sobre-mi">
          <FondoHero />
          <AnimaHero />

          <div className="apertura__interior">
            <div className="apertura__col-foto entra entra--foto">
              <Image
                className="apertura__foto"
                src={ruta('/assets/profile.webp')}
                alt="Retrato de Joaquín Hernández"
                width={440}
                height={520}
                priority
              />
              <nav className="indice" aria-label="Secciones">
                <div className="indice__regla" />
                <div className="indice__lista">
                  {navegacion.map((s) => (
                    <a key={s.id} href={`#${s.id}`}>
                      <span className="indice__num">{s.num}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <div className="apertura__col-texto entra entra--texto">
              <span className="eyebrow">{perfil.ubicacion}</span>
              <h1 className="apertura__nombre">
                Joaquín
                <br />
                Hernández
              </h1>
              <p className="apertura__posicionamiento">{perfil.posicionamiento}</p>
              {/* Los chips van antes de los párrafos: son la prueba verificable
                  de la sección y detrás de 392px de texto quedaban a 1019px, muy
                  debajo del pliegue de 844. Acá heredan la atención del nombre y
                  la propuesta, y suben el CTA que arrastraban con ellos. */}
              <div className="chips">
                {perfil.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
              <div className="apertura__parrafos">
                {perfil.parrafos.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="acciones">
                <a className="boton" href="#contacto">
                  Hablemos de tu proyecto
                </a>
                <a
                  className="enlace-discreto"
                  href="https://github.com/joaquin-her"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ 2 · Trayectoria ══ */}
        <section className="seccion seccion--blanca" id="trayectoria">
          <div className="interior trayectoria">
            <Reveal>
              <span className="eyebrow">01</span>
              <h2 className="h2" style={{ marginTop: 14 }}>
                Trayectoria
              </h2>
            </Reveal>
            <div className="trayectoria__grilla">
              {trayectoria.map((d, i) => (
                <Reveal key={d.destacado} className="dato" variante="escala" delay={i * 90}>
                  <span className={`dato__valor${d.grande ? '' : ' dato__valor--chico'}`}>
                    {d.destacado}
                  </span>
                  <span className="dato__detalle">{d.detalle}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 3 · Capacidades ══ */}
        <section className="seccion" id="capacidades">
          <div className="con-aparte">
            <Reveal className="con-aparte__titulo" variante="izquierda">
              <span className="eyebrow">02</span>
              <h2 className="h2">Capacidades</h2>
            </Reveal>
            <Reveal variante="derecha" delay={80}>
              {capacidades.map((c) => (
                <div key={c.grupo} className="capacidades__fila">
                  <span className="capacidades__grupo">{c.grupo}</span>
                  <p className="capacidades__items">{c.items}</p>
                </div>
              ))}
              <p className="capacidades__idiomas">{idiomas}</p>
            </Reveal>
          </div>
        </section>

        {/* ══ 4 · Proyectos ══ */}
        <section className="seccion seccion--blanca" id="proyectos">
          <div className="interior">
            <Reveal className="proyectos__encabezado">
              <span className="eyebrow">03</span>
              <h2 className="h2">Proyectos</h2>
              <p className="bajada">
                Cuatro casos donde se ve el ciclo completo: el problema, la decisión y el
                resultado.
              </p>
            </Reveal>

            <div className="recorrido">
              <div className="recorrido__linea" aria-hidden="true" />
              {proyectos.map((p, i) => (
                <Caso key={p.num} proyecto={p} indice={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ 5 · Cómo trabajo ══ */}
        <section className="seccion" id="como-trabajo">
          <div className="con-aparte">
            <Reveal className="como__aparte" variante="izquierda">
              <span className="eyebrow">04 — Sección principal</span>
              <h2 className="h2">Cómo trabajo</h2>
              <p className="como__intro">{comoTrabajo.intro}</p>
              <Diagrama laminas={comoTrabajo.diagramas} />
            </Reveal>

            <div>
              {comoTrabajo.items.map((item, i) => (
                <Reveal key={item.num} className="item" variante="derecha" delay={i * 70}>
                  <span className="item__num">{item.num}</span>
                  <div className="item__cuerpo">
                    <h3 className="item__titulo">{item.titulo}</h3>
                    <p className="item__texto">
                      <ConCodigo texto={item.cuerpo} code={item.code} />
                    </p>
                  </div>
                </Reveal>
              ))}

              <Reveal className="postura" variante="derecha" delay={comoTrabajo.items.length * 70}>
                <span className="postura__rotulo">{comoTrabajo.comunicacion.rotulo}</span>
                <div className="postura__cuerpo">
                  {comoTrabajo.comunicacion.parrafos.map((p, i) => (
                    <p key={i} className="postura__texto">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal className="cierre" variante="escala">
                <span className="cierre__eyebrow">El resultado</span>
                <p className="cierre__texto">{comoTrabajo.cierre}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ 6 · Lo que aprendí ══ */}
        <section className="seccion seccion--blanca" id="aprendizajes">
          <div className="interior">
            <Reveal className="proyectos__encabezado">
              <span className="eyebrow">05</span>
              <h2 className="h2">Lo que aprendí</h2>
              <p className="bajada">{aprendizajes.bajada}</p>
            </Reveal>
            <div className="aprendizajes__grilla">
              {aprendizajes.citas.map((c, i) => (
                <Reveal key={c.num} className="aprendizaje" variante="subir" delay={i * 100}>
                  <span className="aprendizaje__num">{c.num}</span>
                  <p className="aprendizaje__texto">{c.texto}</p>
                  {c.pie && <p className="aprendizaje__pie">{c.pie}</p>}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 7 · Contacto ══ */}
        <section className="seccion seccion--oscura" id="contacto">
          <div className="interior">
            <div className="contacto">
              <Reveal className="contacto__texto" variante="izquierda">
                <span className="eyebrow contacto__eyebrow">06 — Contacto</span>
                <h2 className="contacto__titulo">{contacto.titulo}</h2>
                <p className="contacto__frase">{contacto.frase}</p>
              </Reveal>

              <Reveal className="contacto__formulario" variante="derecha" delay={80}>
                <Formulario email={contacto.email} />
              </Reveal>

              <Reveal className="contacto__links" variante="derecha" delay={140}>
                <span className="contacto__separador">o escribime directo</span>
                {contacto.links.map((l) => (
                  <a
                    key={l.rotulo}
                    className="contacto__link"
                    href={l.href}
                    target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  >
                    <span className="contacto__rotulo">{l.rotulo}</span>
                    <span className="contacto__valor">{l.texto}</span>
                  </a>
                ))}
              </Reveal>
            </div>

            <div className="pie">
              <div className="pie__firma">
                <Image
                  className="pie__foto"
                  src={ruta('/assets/profile.webp')}
                  alt=""
                  width={32}
                  height={32}
                />
                <Marca className="marca--clara pie__marca" />
                <span className="pie__texto">{perfil.nombre}</span>
              </div>
              <span className="pie__texto">{perfil.ubicacion}</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
