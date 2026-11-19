# Slices

### scaffold
touches: package.json, package-lock.json, astro.config.mjs, tsconfig.json, .gitignore, .github/workflows/deploy.yml
after:
done: `npm run build 2>&1 | grep -c 'Complete!' && node -p "require('astro/package.json').version" && node -e "import('./astro.config.mjs').then(m=>console.log(m.default.site+m.default.base))" && grep -c 'actions/checkout@v7\|withastro/action@v6\|actions/deploy-pages@v5' .github/workflows/deploy.yml` prints `1`, `7.4.13`, `https://juanwmedia.github.io/leon-ai`, `3`

The thinnest end-to-end proof that Astro 7.4.13 builds here: with no pages yet, `astro build` succeeds and prints `0 page(s) built` then `Complete!` (seen in a scratch project with the same config). `package.json` has `astro@7.4.13` as the only dependency and the scripts `dev`, `build` (`astro build`) and `preview`. `package-lock.json` is committed because `withastro/action` exits with "No lockfile found." without one. `astro.config.mjs` sets `site: 'https://juanwmedia.github.io'` and `base: '/leon-ai'` (GitHub user from `gh api user`). `deploy.yml` is the workflow from the Astro GitHub Pages guide, on push to `main` and `workflow_dispatch`. `.gitignore` covers `node_modules/`, `dist/`, `.astro/`. `tsconfig.json` extends `astro/tsconfigs/strict`.

### brand
touches: public/brand/leon-ai-icon.svg, public/brand/leon-ai-lockup-light.svg, public/brand/leon-ai-lockup-dark.svg, public/favicon.svg
after: scaffold
done: `L=~/Desktop/leon-ai-logo; for f in leon-ai-icon leon-ai-lockup-light leon-ai-lockup-dark; do cmp -s $L/$f.svg public/brand/$f.svg && echo same $f; done; cmp -s $L/leon-ai-icon.svg public/favicon.svg && echo same favicon` prints `same leon-ai-icon`, `same leon-ai-lockup-light`, `same leon-ai-lockup-dark`, `same favicon`

Copies the three SVGs byte for byte from `~/Desktop/leon-ai-logo/`; `public/favicon.svg` is a copy of `leon-ai-icon.svg`. Nothing is redrawn.

### event-data
touches: src/data/event.ts
after: scaffold
done: `node -e "import('./src/data/event.ts').then(({event:e})=>console.log(e.number, e.date, e.agenda.length, e.meetupUrl))" 2>/dev/null` prints `1 2026-11-19T18:00:00+01:00 3 https://www.meetup.com/leon-ai/events/316984200/`

Exports `event`, the current edition as one typed object: `number`, `title` ("Construimos en directo con IA agéntica"), `date` (ISO with offset), `venue` ("Edificio Rojo, CEBT (ILDEFE)"), `address` ("Calle Santos Ovejero, 1, León"), `agenda` (three `{ time, label }` items: 18:00 decidimos qué construir, 18:15 construimos en directo y enseñamos el resultado, 19:30 networking), `meetupUrl`. Plain TypeScript with only erasable syntax (no enums) so Node 24 runs it directly; the check discards stderr so a module-type warning cannot change its output. Edited by hand each month.

### page
touches: src/pages/index.astro
after: scaffold, brand, event-data
done: `npm run build >/dev/null 2>&1 && grep -o 'León AI #1\|href="/leon-ai/favicon.svg"\|href="https://www.meetup.com/leon-ai/events/316984200/"\|>18:00<\|>18:15<\|>19:30<\|href="https://www.linkedin.com/in/juanwmedia"\|href="https://wmedia.es"' dist/index.html | LC_ALL=C sort -u` prints `>18:00<`, `>18:15<`, `>19:30<`, `León AI #1`, `href="/leon-ai/favicon.svg"`, `href="https://wmedia.es"`, `href="https://www.linkedin.com/in/juanwmedia"`, `href="https://www.meetup.com/leon-ai/events/316984200/"`

The whole landing, built from `docs/craft/landing/look/landing-mane.html`: same tokens, fonts, sections and copy, with the edition block rendered from `event` (edition name as `León AI #{number}`, date formatted in Spanish from `event.date`, each agenda time alone in its own `<time>` element (the date block never puts a bare time alone in an element) mapped from `event.agenda`, CTA to `event.meetupUrl`). The lion is inline SVG generated in the Astro frontmatter instead of the mockup's runtime script, rays and face as separate SVGs so only the mane rotates; the page ships no JS. In Astro 7.4.13 `import.meta.env.BASE_URL` is `/leon-ai` with no trailing slash (seen in a scratch build), so asset URLs join it with an explicit `/` after stripping any trailing one. Hero CTA links to the group (`https://www.meetup.com/leon-ai/`). Footer: Meetup, `https://www.linkedin.com/in/juanwmedia`, `https://wmedia.es`. `lang="es"`, title "León AI", meta description.
