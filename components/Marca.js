/**
 * Monograma ".hz" — marca personal.
 *
 * El punto va en petróleo (#1E3A46) y las letras en tinta (#0A0E14),
 * ambos de la paleta. Sobre fondo oscuro los colores se invierten vía
 * la clase .marca--clara.
 *
 * Es texto real dentro del SVG (no trazados), así que hereda la
 * tipografía de títulos del sitio.
 */
export default function Marca({ className = '', ...props }) {
  return (
    <svg
      className={`marca ${className}`.trim()}
      viewBox="0 0 64 32"
      role="img"
      aria-label=".hz"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="0"
        y="25"
        fontFamily="var(--serif)"
        fontSize="30"
        fontWeight="700"
        letterSpacing="-1.6"
      >
        <tspan className="marca__punto">.</tspan>
        <tspan className="marca__letras">hz</tspan>
      </text>
    </svg>
  );
}
