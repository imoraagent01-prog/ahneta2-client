# ahneta2-client agent notes

This is a **literal 1:1 clone** of the live https://www.ahneta.nl/ marketing site, not a
redesign. Compare with `clients/ahneta-client`, which is a from-scratch reinterpretation
built for the same client — this repo exists specifically to demonstrate exact visual/UI
fidelity to the original.

## How it was built

1. Generated with [ditto.site](https://github.com/ion-design/ditto.site) (MIT), a
   deterministic website compiler: Playwright captures the live, rendered DOM/CSS/assets
   for every discovered route, then compiles that capture into a Next.js App Router +
   Tailwind v4 project. No manual redesign, no LLM-guessed layout: every page body is
   generated from what the live browser actually rendered.
2. The crawler also discovered Odoo backend/utility routes linked from the site
   (`/web/login`, `/web/reset_password`, `/website/social/*`, `/website/info`, and the
   two blog RSS feed endpoints). Those were removed from the generated app entirely; any
   in-page link that pointed at them now points at the real `https://www.ahneta.nl/...`
   URL externally instead of a local route. This mirrors the explicit brief: clone every
   real page, skip the backend login.
3. Every remaining page was then manually verified against the live site at desktop
   (1440px) and mobile (390px) widths and touched up for exact text, image, font, and
   layout fidelity.

## Conventions

- Next.js 15 App Router, static export (`output: "export"` in `next.config.mjs`) since
  this is a pure marketing clone with no backend.
- Tailwind v4 via `@tailwindcss/postcss`, plus a small amount of generated
  fidelity-preserving CSS per route (`ditto.css`) for anything Tailwind utilities alone
  couldn't express faithfully (custom clip-paths, exact captured spacing, etc).
- pnpm package manager, use `pnpm` not `npm`, matching the rest of this monorepo.
- Most routes carry their own local `components/` dir (`tile.tsx`, `list-row.tsx`)
  generated per-page; a few generic ones live in the top-level `src/app/components/`.
  Prefer editing the local copy for a page-specific fix.
- Read the generated `website/AGENTS.md` and `website/ARCHITECTURE.md` (ditto's own
  handoff docs) before making structural changes — they describe which generated files
  are safe to hand-edit vs. plumbing that shouldn't be casually rewritten.
- Demo posture: no lead-capture backend, no CMS, no deploy config yet. This is a
  fidelity showcase, not (yet) a production client site.
