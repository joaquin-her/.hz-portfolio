'use client';

import { useState } from 'react';

/**
 * Formulario de contacto que abre el cliente de correo del visitante.
 *
 * El sitio es un export estático sin backend, así que no hay a dónde
 * hacer un POST: el envío se delega al cliente de correo con un
 * `mailto:` que lleva asunto y cuerpo ya redactados. La persona todavía
 * tiene que apretar "Enviar" en su cliente —no se puede evitar sin
 * servidor—, pero llega con el mensaje escrito.
 *
 * Los campos se codifican con `encodeURIComponent`: sin eso, un `&` o un
 * `#` en el texto cortan la URL y el cuerpo llega truncado.
 */
export default function Formulario({ email }) {
  const [nombre, setNombre] = useState('');
  const [remitente, setRemitente] = useState('');
  const [origen, setOrigen] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviar = (e) => {
    e.preventDefault();

    const asunto = nombre ? `Contacto desde el sitio — ${nombre}` : 'Contacto desde el sitio';
    // El remitente va en el cuerpo además de en el `From` del cliente:
    // si la persona escribe desde una cuenta distinta de la que dejó
    // acá, sigue quedando registro de dónde quiere que le respondan.
    // El origen viaja en el cuerpo: sin backend no hay donde registrarlo,
    // y en el mail sirve para saber que canal esta trayendo consultas.
    const firma = ['—', nombre, remitente, origen && `Me encontro por: ${origen}`]
      .filter(Boolean)
      .join('\n');
    const cuerpo = `${mensaje}\n\n${firma}`;

    window.location.href =
      `mailto:${email}` +
      `?subject=${encodeURIComponent(asunto)}` +
      `&body=${encodeURIComponent(cuerpo)}`;
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <div className="formulario__fila">
        <label className="formulario__campo">
          <span className="formulario__rotulo">Nombre</span>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="name"
          />
        </label>

        <label className="formulario__campo">
          <span className="formulario__rotulo">Tu email</span>
          <input
            type="email"
            name="email"
            value={remitente}
            onChange={(e) => setRemitente(e.target.value)}
            autoComplete="email"
          />
        </label>
      </div>

      <label className="formulario__campo">
        <span className="formulario__rotulo">Mensaje</span>
        <textarea
          name="mensaje"
          rows={5}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          placeholder="Contame en qué estás trabajando."
        />
      </label>

      <button type="submit" className="formulario__enviar">
        Escribirme
        <span className="formulario__flecha" aria-hidden="true">&#8594;</span>
      </button>

      <p className="formulario__nota">
        Se abre tu cliente de correo con el mensaje ya escrito.
      </p>

      <label className="formulario__origen">
        <span>Como me encontraste</span>
        <select
          name="origen"
          className="formulario__select"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        >
          <option value="">prefiero no decirlo</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="GitHub">GitHub</option>
          <option value="Una recomendacion">una recomendacion</option>
          <option value="Un buscador">un buscador</option>
          <option value="Otro">otro</option>
        </select>
      </label>
    </form>
  );
}
