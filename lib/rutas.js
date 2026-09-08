/**
 * Prefijo de las rutas públicas.
 *
 * En producción el sitio se sirve bajo /mi-cv (GitHub Pages), pero
 * `next/image` con `unoptimized: true` no aplica el basePath al `src`,
 * así que las rutas de assets se arman con este helper.
 *
 * El valor viaja como variable de entorno pública para que coincida
 * en el HTML del servidor y en la hidratación del cliente.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function ruta(camino) {
  return `${basePath}${camino}`;
}
