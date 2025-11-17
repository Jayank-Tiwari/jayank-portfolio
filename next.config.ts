import type { NextConfig } from 'next';

// Centralize the basePath so we can also expose it to client code
const APP_BASE_PATH = '/jayank-portfolio';

const nextConfig: NextConfig = {
  // 1. Enable Static Site Generation (SSG)
  output: 'export',

  // 2. Set the base path for GitHub Pages
  // IMPORTANT: Replace <your-repo-name> with your GitHub repository name
  // Example: if your repo is "https.../jayank-portfolio", set basePath: "/jayank-portfolio"
  basePath: APP_BASE_PATH,

  // 3. Disable Next.js image optimization, as it's not supported in static exports
  // This is why we added `unoptimized={true}` to the <Image> component
  images: {
    unoptimized: true,
  },

  // 4. Enable the React Compiler
  reactCompiler: true,

  // 5. Expose the basePath to client-side code via an env var
  env: {
    NEXT_PUBLIC_BASE_PATH: APP_BASE_PATH,
  },
};

export default nextConfig;