# Portfolio v3

Personal portfolio — Next.js 16 (App Router), TypeScript, Tailwind v4, Motion.
Bilingual FR/EN, dark-first with a light toggle, statically prerendered.

```bash
npm run dev
```

Runs on http://localhost:3300 (see `../.claude/launch.json`, config name `portfolio`).
`/` redirects to `/en` or `/fr` based on the browser's `Accept-Language`.

## Where the content lives

Everything you'd want to change is in two files. No copy lives inside components.

| File | Contains |
| --- | --- |
| `src/content/site.ts` | Name, role, socials, About text, experience, the six projects, the technology groups |
| `src/content/ui.ts` | Interface chrome: nav labels, buttons, section titles, aria labels |

Every string is an `{ en: "…", fr: "…" }` pair — add both languages and it appears in both.
Anything still marked `// TODO` is placeholder text.

Technologies are referenced by key (`"react"`, `"typescript"`, …). To add one that isn't
there yet, add the key to the `TechKey` union in `src/content/site.ts` and give it an
icon and brand colour in `src/components/tech-registry.tsx`.

## Design tokens

All colour and type-scale tokens are CSS variables in `src/app/globals.css`: `:root`
holds the light theme, `.dark` overrides it. Components only ever use the semantic
Tailwind names (`bg-bg`, `text-muted`, `border-line`, `text-accent`) — no raw hex
anywhere in the components.

Contrast is checked: every text token clears WCAG AA (4.5:1) against its background in
both themes. If you change `--text-faint` or `--accent`, re-check them.

## How the motion works

- **Scroll reveals** are CSS transitions toggled by `src/lib/use-reveal.ts`, a single
  shared rAF-throttled scroll listener. Anything already at the fold on mount reveals
  immediately rather than waiting for a frame.
- **Motion** (`motion/react`) is used only where it earns its keep: the hero entrance,
  the reading-progress bar, the animated nav underline and the mobile menu.
- `prefers-reduced-motion` is honoured globally — reveals become instant, the technology
  marquees stop and wrap into a static grid.

## Gotchas

Turbopack caches the compiled Tailwind CSS aggressively. If a **newly used variant**
(e.g. the first `dark:` utility on the page) doesn't take effect in dev, stop the server,
delete `.next`, and restart. A production build always reflects the source.

**Changing a `next/font` import needs a dev-server restart.** Hot-reloading a font swap
leaves the server referencing the old identifier and every route 500s with
`ReferenceError: <OldFont> is not defined`. The file is fine — the server isn't. Restart it.
