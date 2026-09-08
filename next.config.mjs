/** @type {import('next').NextConfig} */

// Si el repo se llama "mi-cv", GitHub Pages sirve en /mi-cv.
// Si usás el repo <usuario>.github.io, poné basePath = ''.
const repo = 'mi-cv';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
