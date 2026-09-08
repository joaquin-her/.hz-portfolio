/** @type {import('next').NextConfig} */

// El sitio se sirve en <usuario>.github.io/<repo>, así que todas las
// rutas cuelgan de /<repo>. Si lo movés al repo <usuario>.github.io,
// poné repo = '' para que basePath quede vacío.
const repo = '.hz-portfolio';
const isProd = process.env.NODE_ENV === 'production';

const basePath = isProd ? `/${repo}` : '';

const nextConfig = {
  output: 'export',
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  basePath,
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
