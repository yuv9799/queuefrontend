# KIMS Queue Management System (Bhubaneswar)

Digital queue/token management for Kalinga Institute of Medical Sciences. Patients get tokens across departments (OPD, Pharmacy, Lab, Radiology, Billing, Emergency); staff operate queues live; a TV board shows real-time status; admins manage structure and view analytics.

## Stack
- **Backend**: Node.js (v22.5+) · Express · built-in `node:sqlite` (no native deps) · Socket.io
- **Frontend**: React 18 · Vite 5 · Tailwind CSS 3 · Recharts · socket.io-client

## Quick start

```bash
# 1. Install backend (DB): Node's built-in SQLite needs NO install
cd backend && npm install

# 1b. Configure the backend for local development
cp .env.example .env
printf '\nNODE_ENV=development\nJWT_SECRET=%s\n' "$(openssl rand -base64 48)" >> .env

# 2. Install frontend
cd .. && cd frontend && npm install

# 3. Seed KIMS demo data (creates data/queue.db)
cd ../backend && npm run seed

# 3b. (Optional) Seed 100 demo reviews for the Reviews & analytics UI
npm run seed:reviews

# 4. Run backend  -> http://localhost:8080
npm run dev

# 5. In a second terminal run frontend -> http://localhost:5173
cd ../frontend && npm run dev
```

Or from the repo root after installing root deps:
```bash
npm install              # installs root + concurrently
npm run install:all      # installs backend + frontend
npm run seed
npm run dev              # runs both backend & frontend together
```

## Demo accounts
| Role      | Email            | Password       |
|-----------|------------------|----------------|
| Admin     | admin@kims.in    | admin123       |
| Officer   | officer@kims.in  | officer123     |
| Reception | reception@kims.in| reception123   |

## Tests
```bash
cd backend && npm test
```

## Pages
- `/` — Public token kiosk (department → service area) + Live Queue status + Reviews & Feedback
- `/status` — Track a token live (search by number, now-serving + estimated wait)
- `/live` — Live TV queue board (filterable by department)
- `/departments` — Browse departments and their service areas
- `/help` — Help / FAQ accordion
- `/console` — Staff queue console (Next / Call / Hold / Skip / Complete / Cancel)
- `/admin` — Admin dashboard + analytics + structure CRUD + **review moderation**
- `/login` — Staff login

## Layout
```
backend/   Express API + SQLite + Socket.io (models, routes, sockets, seed, tests)
frontend/  React + Vite + Tailwind (pages, components, context, services)
```