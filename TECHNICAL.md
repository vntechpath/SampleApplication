# Technical Details, Best Practices, NFRs and Suggestions

This document describes the frontend-focused SampleApplication repository: technical details, recommended best practices, measurable Non-Functional Requirements (NFRs), and next-step suggestions.

## 1. High-level technology & architecture

- Frontend: React 18 + TypeScript.
- Bundler/dev server: Vite (configured with `vite.config.ts` to use `client/` as root).
- Styling: TailwindCSS (+ typography) and small animation libs (e.g., `tailwindcss-animate`, Framer Motion).
- UI primitives: Radix UI components, Lucide icons.
- Data fetching: @tanstack/react-query for remote state, caches and background refresh.
- Project layout (important):
  - `client/` — React app source and `index.html`
  - `vite.config.ts` — project-level Vite config (root -> `client`)
  - `package.json` — scripts & dependencies (frontend-only)
  - `tailwind.config.ts` / `postcss.config.js` — styling config

## 2. Contract / minimal runtime expectations

- Entry point (dev): `npm run dev` → Vite dev server serves the SPA from `client/`.
- Entry point (prod): `npm run build` → `vite build` outputs static assets. `npm run start` runs `vite preview` to serve built output locally.
- Environment variables: Use `.env` / `.env.local` with Vite's `import.meta.env` naming (`VITE_` prefix for client-exposed variables).
- Public API contract (recommended): Define types for all API responses (Zod or TypeScript interfaces) in `shared/` so both client code and any backend can depend on the same contract.

## Application entry & flow

- Entry files:
  - `client/index.html` — HTML shell; it loads `/src/main.tsx` via a module script.
  - `client/src/main.tsx` — bootstraps React (`createRoot`) and renders `<App />` into `#root`.
  - `client/src/App.tsx` — top-level React component that composes providers, layout, and router.

- Providers and global behaviors (mounted in `App`):
  1. `QueryClientProvider` (from `@tanstack/react-query`) — central caching, deduping, and background refresh for remote data. The project defines a `queryClient` with a custom `getQueryFn` that resolves fetches by joining query keys into a fetch URL and handles 401 behavior.
  2. `TooltipProvider` — global tooltip settings for Radix-based tooltips.
  3. `ThemeProvider` — theme context (dark/light) and persistence (usually localStorage via the provider implementation).
  4. `Toaster` — global toast notification root for user-visible notifications.

- Routing & page composition:
  - Routing uses `wouter`. `App` mounts a `Router` which maps routes to pages:
    - `/` → `Dashboard` (main landing page) — renders metrics, charts, and primary UI components.
    - fallback → `NotFound` page.

- Data flow (typical request lifecycle):
  1. Component calls `useQuery(['api', 'some', 'endpoint'])` or similar. `react-query` uses the default `queryFn` defined in `client/src/lib/queryClient.ts` which joins the query key into a URL and performs a `fetch` with `credentials: 'include'`.
  2. The `getQueryFn` will `throw` on non-2xx responses (unless configured to `returnNull` on 401), which the component should handle via `isError` / `error` state or `react-query` error boundaries.
  3. On success, JSON payload is returned and cached by the `queryClient`. Components re-render with the data. `staleTime` and other options control refetch behavior.
  4. Mutations use `apiRequest` helper which sends JSON payloads and calls `throwIfResNotOk` to raise clear errors on failure.

- UI interactions & lifecycle:
  - User actions dispatch form submissions (via `react-hook-form`) or trigger mutations. Mutations update server-side state and often invalidate relevant queries in `react-query`.
  - Modal flows (e.g., `SkuDetailModal`) are controlled by local state or context; opening a modal may trigger a `useQuery` to load detail data.
  - Toasts are fired on success/failure to provide immediate feedback.

- Build & deploy flow:
  - `vite build` emits static assets (configured `outDir` in `vite.config.ts` usually `dist/public`). Those files are ready to be served by any static host (Netlify, Vercel, S3+CloudFront).
  - `vite preview` serves the built assets locally for smoke testing.

This entry & flow section documents the full path from a browser request to data loading and UI rendering. It should help new contributors trace where to add providers, add queries, or wire in new pages.

## 3. Small engineering contract (inputs / outputs / errors)

- Inputs: user interactions, route params, query params, API responses.
- Outputs: DOM updates, network calls, local cache updates. All async data flows should surface loading / error / empty states.
- Error modes:
  - Network failures: show retry affordances (use react-query retry/backoff policies).
  - Client validation failure: immediate feedback using react-hook-form + zod.
  - Unexpected UI errors: capture via an Error Boundary and report to observability tooling.

## 4. Best practices (concrete & prioritized)

1. Type-first development
   - Always provide types for props and API shapes. Prefer `zod` for runtime validation where data crosses trust boundaries.

2. Small, focused components
   - Keep components simple (single-responsibility). Prefer small presentational components + container hooks.

3. Performance
   - Use code-splitting (React.lazy + dynamic imports) for route-level chunks.
   - Keep initial JS bundle small: tree-shake, avoid large polyfills, use CSS-only animations where possible.
   - Use `react-query` to cache and dedupe network requests; set appropriate staleTime and cacheTime.

4. Accessibility
   - Use semantic HTML. Use Radix components which are accessible by default, but validate with axe/lighthouse.
   - Keyboard navigability and focus management are required for interactive components.

5. Styling
   - Keep Tailwind classes co-located; adopt a `ui/` or `components/` folder for shared building-block components and tokens.

6. Secrets & env
   - Never check secrets into git. Use `.env` (gitignored) and Vite's `VITE_` prefix for any public variables.

7. Dev DX
   - Use ESLint + Prettier with a consistent config and run format/lint in pre-commit hooks (husky + lint-staged).
   - Use `npm ci` in CI for reproducible builds.

## 5. Measurable NFRs (targets you can measure and monitor)

- Performance
  - Lighthouse Performance score ≥ 90 for main pages (desktop), >= 70 on mobile.
  - First Contentful Paint (FCP) < 1.5s on fast 4G; Largest Contentful Paint (LCP) < 2.5s on fast 4G.
  - Initial JS bundle (gzip) < 300 KB for core application shell.

- Reliability
  - CI passing rate = 100% on protected branches.
  - Production deploy success rate > 99.9% (with automatic rollback on failure).

- Security
  - Zero critical or high vulnerabilities (automatically blocked in CI for deploy).
  - No secrets in repo; dependencies scanned weekly.

- Maintainability
  - Unit test coverage ≥ 70% for critical modules; end-to-end coverage for major flows.
  - Average PR size: keep PRs < 500 lines to ease review.

- Accessibility
  - WCAG 2.1 AA for public-facing flows; automated accessibility checks on PRs.

## 6. Testing & CI recommendations

- Tests
  - Unit tests: Vitest + React Testing Library (fast, integrates with Vite).
  - E2E: Playwright or Cypress for critical user journeys (login, key flows, data changes).

- CI (GitHub Actions recommended)
  - Workflow steps: checkout → node setup → npm ci → lint → typecheck → test → build → upload artifact.
  - Gate merges on green CI and required PR reviews.

Example minimal workflow steps (high level):

1. npm ci
2. npm run lint
3. npm run check (tsc --noEmit)
4. npm test -- --coverage
5. npm run build

## 7. Observability & error handling

- Add an Error Boundary at the root to catch rendering errors and log them.
- Capture runtime exceptions and user-facing errors with a service (Sentry) and capture performance vitals (web-vitals).
- Instrument key metrics: page load times, API latency, error rates, and user conversion funnels.

## 8. Security checklist

- Use CSP headers at hosting edge (Netlify/Cloudflare). Use `strict-dynamic` when appropriate.
- Sanitize any HTML inserted into the DOM. Avoid dangerouslySetInnerHTML unless absolutely required.
- Keep `package-lock.json` checked in and run `npm audit` in CI. Automate Dependabot or similar.

## 9. Clean-up & repository hygiene suggestions

1. Keep only frontend dependencies in `package.json` (done). Periodically run `npm prune` and `npm ci` locally.
2. Add ESLint + Prettier configs and enforce via pre-commit hook.
3. Add `CONTRIBUTING.md` and PR template listing run/test steps and required checks.

## 10. Migration or reintroducing backend later

- If a backend is needed later, consider splitting repository into two packages/roots:
  - `packages/web` (frontend) and `packages/api` (backend) or separate repos.
  - Use a shared `shared/` package for types and validation schemas.

## 11. Suggested immediate actions (priority)

1. Add ESLint + Prettier + lint-staged + husky and run autofix on the codebase.
2. Add a minimal GitHub Actions CI that runs lint/typecheck/test/build on PRs.
3. Add Vitest and a couple of smoke tests for top-level pages/components.
4. Add Error Boundary and web-vitals instrumentation.

## 12. Appendices: Useful commands

- Dev server: `npm run dev`
- Build: `npm run build`
- Preview built assets: `npm run start`
- Typecheck: `npm run check`

---

If you want, I can now:
- Add ESLint & Prettier config files and run formatting.
- Create a simple GitHub Actions CI workflow in `.github/workflows/ci.yml` and push it.
- Add a small Vitest setup and example test for a key component.

Tell me which of these you'd like next and I will implement it and push to `LocalChanges`.
