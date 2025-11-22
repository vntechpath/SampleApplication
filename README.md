# SampleApplication (Frontend-only)

This repository contains a React + TypeScript single-page application (SPA) built with Vite and Tailwind CSS.

The project was trimmed to be frontend-only: server/backend code and backend-specific dependencies were removed and the project now uses Vite to develop, build and preview the client located in the `client/` folder.

## Quick summary

- Tech: React 18, TypeScript, Vite, Tailwind CSS, Radix UI, @tanstack/react-query
- Dev tools: ESLint, Prettier, Vitest (suggested)
- Project root `vite.config.ts` is configured to serve the `client` folder as Vite's root.

## Run locally (PowerShell on Windows)

1. Install dependencies (use `npm ci` when reproducing a clean environment):

```powershell
cd 'f:\Vinoth N\Technical\Replit\repo\SampleApplication'
npm install
```

2. Start dev server (Vite):

```powershell
npm run dev
# Open http://localhost:5173 (Vite reports the actual host/port in the terminal)
```

3. Build and preview production build:

```powershell
npm run build
npm run start
# preview runs vite preview which serves the built files locally
```

## Scripts

- `npm run dev` — start Vite dev server (serves `client/`)
- `npm run build` — production build of the client
- `npm run start` — preview the production build locally (Vite preview)
- `npm run check` — typecheck with `tsc` (keeps same name as before)

Note: I cleaned server-related scripts and replaced them with Vite-based scripts so `npm run dev` runs the frontend only.

## Project layout (important files)

- `client/` — React app source (entry: `client/src`, `client/index.html`)
- `vite.config.ts` — Vite config (root set to `client`)
- `package.json` — project scripts and dependencies (frontend-only after cleanup)
- `tailwind.config.ts` / `postcss.config.js` — Tailwind & PostCSS config

## Why frontend-only (notes)

- Original repository included an Express server and various backend packages. The repository was converted to a frontend-only workspace to simplify local development and reduce install size.
- Backend files were removed from the `server/` folder and backend deps were removed from `package.json`. If you need to restore backend functionality, that work can be reversed or reintroduced as a separate project.

## Recommended next steps

- Add configuration files for ESLint & Prettier (if not present) and enforce them in CI.
- Add a GitHub Actions workflow to run lint, typecheck, test and build on PRs.
- Add unit tests with Vitest + React Testing Library for critical components.
- Add README sections for contribution guidelines and environment variables if you later reintroduce a backend.

## Troubleshooting

- If you see unexpected errors during `npm install`, try:

```powershell
npm ci
# or, temporarily, npm install --legacy-peer-deps
```

- If the dev server doesn't start, confirm your terminal is in the project root and run `npx vite --version` to verify Vite is available.

## Security & maintenance notes

- Keep `package-lock.json` checked in and use `npm ci` in CI for reproducible installs.
- Run `npm audit` regularly and update vulnerable dependencies.

---

If you'd like, I can also:

- Add an ESLint + Prettier configuration and format the codebase.
- Add a GitHub Actions CI workflow that runs lint, typecheck and build on each PR.
- Add a short CONTRIBUTING.md and a PR template.

Feel free to tell me which of the above I should do next.
