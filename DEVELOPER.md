# Developer Guide

This developer guide collects actionable instructions, conventions, and checklists for contributors working on the frontend-only SampleApplication.
It expands on `README.md` and `TECHNICAL.md` with step-by-step developer workflows.

## Quick start (local dev)

Prerequisites
- Node.js 18+ (the repo was tested with Node 20).
- npm (use the shipped `package-lock.json`).

Clone & setup

```powershell
git clone https://github.com/vntechpath/SampleApplication.git
cd SampleApplication
git checkout LocalChanges
npm ci
```

Start development

```powershell
npm run dev
# open http://localhost:5173
```

Build & preview

```powershell
npm run build
npm run start
# preview runs vite preview serving the built files
```

If you run into dependency resolution issues, `npm install --legacy-peer-deps` may help temporarily but prefer adjusting package versions for a clean `npm ci` in CI.

## Project structure (developer view)

- client/
  - src/
    - App.tsx — top-level app composition (providers, layout, router)
    - main.tsx — React bootstrap
    - pages/ — page components (Dashboard, NotFound, ...)
    - components/ — UI components and primitives
    - lib/ — shared utilities (e.g., `queryClient.ts`)
  - index.html — app shell
- shared/ — types and schemas shared across apps (if used)
- vite.config.ts — Vite root is set to `client/` (so Vite serves the client directly)

## Application entry & runtime flow (summary)

1. Browser loads `index.html` which imports `/src/main.tsx`.
2. `main.tsx` calls `createRoot(...).render(<App />)`.
3. `App.tsx` composes `QueryClientProvider`, `ThemeProvider`, `TooltipProvider`, and `Toaster`, and mounts the router.
4. Pages call `react-query` hooks (useQuery/useMutation) which use the repo's `queryClient` and `getQueryFn` to call APIs.

See `TECHNICAL.md` for a full explanation of providers and data flow.

## How to add a new page (checklist)

1. Create a new file under `client/src/pages/` (e.g., `MyPage.tsx`).
2. Add a route in `client/src/App.tsx` (using `wouter`) mapping the path to your page.
3. If the page needs remote data:
   - Add a `useQuery(['api', 'my', 'resource'], { /* options */ })` with typed response.
   - Use Zod to define a response schema in `shared/` (or `client/src/schemas`) and parse response if needed.
4. Build a small presentational component and separate data logic into hooks (e.g., `useMyPageData.ts`).
5. Add tests:
   - Unit tests for UI pieces (Vitest + React Testing Library).
   - E2E tests for critical user flows (Playwright/Cypress) if applicable.
6. Add accessibility checks (role attributes, aria-labels, keyboard support).
7. Update storybook (if using) or add example in `components/examples/`.
8. Run `npm run lint` and `npm run check` before opening a PR.

## Component & coding conventions

- Prefer function components with explicit props types.
- Keep components focused: presentational components accept props and avoid direct data fetching.
- Use `hooks/` for data and behavior logic (e.g., `useSkuDetail`, `useFilters`).
- Style with Tailwind classes. For complex styling, extract to a small component and keep classnames readable using `clsx`.
- Use Radix primitives where accessibility matters; still run axe/lighthouse checks.

## API contracts and types

- Put shared Zod schemas or TypeScript types in `shared/` so they can be reused.
- When calling APIs, prefer typed `useQuery<T>` and validate with Zod at the network boundary if data can be untrusted.

Example network pattern (recommended):

```ts
// client/src/lib/queryClient.ts
// getQueryFn joins the queryKey into a fetch URL and returns JSON.
// Components call useQuery(['api', 'sku', id]) and expect typed response.
```

## Testing

- Unit tests: Vitest + React Testing Library. Put tests next to components: `Component.test.tsx`.
- Add a `vitest` config that uses the Vite environment for fast testing.
- Coverage: target minimum thresholds for critical modules; configure CI to fail when coverage drops.

Running tests locally

```powershell
npm run test
```

## Linting & formatting

- Use ESLint + Prettier. Example script names in `package.json`:
  - `lint`: run ESLint across `client/src`.
  - `format`: run Prettier to autofix formatting.
- Use `lint-staged` + `husky` pre-commit hook to run `eslint --fix` and `prettier --write` on staged files.

## Debugging tips

- To inspect network requests from `getQueryFn`, add console logs in `client/src/lib/queryClient.ts`.
- To reproduce production builds locally:

```powershell
npm run build
npm run start
```

## Environment variables

- Client-exposed env variables must begin with `VITE_` to be available in `import.meta.env`.
- Keep secrets outside the repo and set them in CI / hosting environment.

## Commit & PR guidelines

- Use small, focused commits. Follow conventional commit messages (feat, fix, chore, docs).
- Open PRs against `main` (or the repo branch strategy). Include a description, screenshots, and testing steps.
- Ensure CI passes and at least one code review before merge.

## CI suggestions

- Create `.github/workflows/ci.yml`:
  - Steps: checkout, setup-node, npm ci, lint, typecheck, test, build.
  - Optionally add a cache for `node_modules` based on `package-lock.json` or `~/.npm` to speed up installs.

## Common troubleshooting

- Errors after `npm ci`:
  - Try `npm cache clean --force` and `npm ci` again.
  - If peer-dependency errors occur, use `npm install --legacy-peer-deps` temporarily but consider upgrading packages.
- Vite cannot find files: ensure you're running from project root and `vite.config.ts` root is `client`.

---

If you'd like, I can now:
- Add ESLint + Prettier config files and run formatting.
- Add `husky` + `lint-staged` pre-commit hooks.
- Add a minimal `ci.yml` to `.github/workflows/` and push it.

Tell me which of these you'd like next and I'll implement and push to `LocalChanges`.
