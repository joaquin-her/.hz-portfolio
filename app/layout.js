import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-titulos',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cuerpo',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://joaquin-her.github.io'),
  title: 'Joaquín Hernández — Ingeniería de software con criterio de negocio',
  description:
    'Diseño y construyo productos de punta a punta, y el sistema de trabajo con el que un equipo desarrolla con IA. Buenos Aires, Argentina.',
  keywords: [
    'ingeniería de software',
    'MCP',
    'desarrollo con IA',
    'Buenos Aires',
    'freelance',
    'Next.js',
  ],
  authors: [{ name: 'Joaquín Hernández' }],
  openGraph: {
    title: 'Joaquín Hernández — Ingeniería de software con criterio de negocio',
    description:
      'Diseño y construyo productos de punta a punta, y el sistema de trabajo con el que un equipo desarrolla con IA.',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joaquín Hernández — Ingeniería de software con criterio de negocio',
    description:
      'Diseño y construyo productos de punta a punta, y el sistema de trabajo con el que un equipo desarrolla con IA.',
  },
};

export const viewport = {
  themeColor: '#f4fefe',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={`${bricolage.variable} ${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
