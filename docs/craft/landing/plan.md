# León AI landing: plan

## What

The empty repo becomes an Astro 7.4.13 static site with one page: the León AI landing in the dark "mane" look chosen in shape. The current edition lives in `src/data/event.ts`; the page reads it at build time and ships no JS. A GitHub Actions workflow publishes `dist/` to GitHub Pages at `https://juanwmedia.github.io/leon-ai/`. Pushing to GitHub and switching Pages to "GitHub Actions" is the human's step after implement; no slice can prove the live deploy.

## How it looks

Settled in shape: [landing-mane](look/landing-mane.html). The page reproduces it; the visual check happens in `/crafting:try`.

## Acceptance

- `npm run build` succeeds with Astro 7.4.13. (scaffold)
- `astro.config.mjs` resolves the site to `https://juanwmedia.github.io/leon-ai`. (scaffold)
- `.github/workflows/deploy.yml` uses the versions in the Astro GitHub Pages guide: `actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5`. (scaffold)
- `public/brand/` holds byte-for-byte copies of the three logo SVGs, and `public/favicon.svg` is the icon. (brand)
- `src/data/event.ts` exports edition 1 with its ISO date, three agenda items and its Meetup URL. (event-data)
- The built `dist/index.html` shows the edition name, all three agenda times and the Meetup event link. (page)
- The favicon link in the built page carries the `/leon-ai/` base. (page)
- The built page links to the LinkedIn profile and wmedia.es. (page)
