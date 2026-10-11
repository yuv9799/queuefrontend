# KIMS Queue Frontend

React + Vite + Tailwind frontend for the KIMS Queue Management System (Bhubaneswar).

This repository is the **frontend only**. The backend (Express + Socket.io + SQLite)
lives in the separate [`queuebackend`](https://github.com/yuv9799/queuebackend) repo and
is hosted on a persistent Node host.

## Stack
- React 18, Vite 5, Tailwind CSS 3, Recharts, socket.io-client
- React Router (`BrowserRouter`) with an SPA fallback so deep links work on refresh

## API base URL (frontend ⇄ backend)
All REST and Socket.io traffic reads the backend origin from the build-time
environment variable **`VITE_API_URL`** (see `src/services/api.js` and
`src/services/socket.js`). **There are no hardcoded production URLs in the
source.**

- Local dev default: `http://localhost:8080` (used only when `VITE_API_URL` is unset)
- Production (Vercel): set **`VITE_API_URL`** in the Vercel project to your deployed
  backend origin, e.g. `https://your-backend-host.example.com` (no trailing slash).

> `VITE_`-prefixed variables are embedded in the client bundle, so never put secrets in
> `VITE_API_URL` or any other `VITE_` variable.

## Local development
```bash
npm install
cp .env.example .env.local   # optional: VITE_API_URL=http://localhost:8080
npm run dev                  # http://localhost:5173
```

## Production build
```bash
npm ci
VITE_API_URL=https://your-backend-host.example.com npm run build
```
Built output is written to `dist`.

## Vercel deployment
1. Create a Vercel project from this repo (`yuv9799/queuefrontend`), production branch `main`.
2. Use Framework Preset **Vite** (the repo-root `vercel.json` also sets the install/build
   command, output directory, and an SPA rewrite so routes like `/status` work on refresh).
3. Add the environment variable **`VITE_API_URL`** = your deployed backend URL.
4. Deploy. You do **not** need a GitHub Pages workflow for Vercel, but one is included
   (`.github/workflows/deploy.yml`) in case you also want a GitHub Pages build.