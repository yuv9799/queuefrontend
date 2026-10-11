// GitHub Pages SPA fallback.
// GH Pages is a static host: refreshing a client-side route (e.g. /status)
// looks for a real file there and 404s. Serving a copy of the built index.html
// as 404.html makes GH Pages hand the app document for ANY unknown path while
// preserving the requested URL, so the router can render the correct route.
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
copyFileSync(`${dist}index.html`, `${dist}404.html`);
console.log('Generated dist/404.html SPA fallback.');