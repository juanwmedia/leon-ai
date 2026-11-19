# León AI landing

## What

A one-page website for León AI, the in-person AI community in León, Spain. It tells a newcomer what happens at a session (the room picks something, it gets built live with agentic AI on the big screen), shows the current edition (date, venue, agenda) and sends them to Meetup to sign up. For anyone curious about AI in León, programmers or not. Spanish only. Simple, but it has to look great.

## How it works

![How it works](how-it-works.svg)

One data file and the logos feed a single Astro page; a push to `main` builds it with the Astro action and publishes static HTML to GitHub Pages under `/leon-ai/`.

- `package.json`, `astro.config.mjs` (new): Astro 7.4.x (latest on npm today: 7.4.13), static output, `site: 'https://<github-user>.github.io'`, `base: '/leon-ai'`.
- `src/data/event.ts` (new): the current edition as one typed object (number, title, ISO date, venue, address, agenda items, Meetup event URL). Updated by hand each month.
- `src/pages/index.astro` (new): the whole landing. Reads `event.ts`. Asset and internal links go through `import.meta.env.BASE_URL` because of `base`.
- `public/brand/` (new): copies of `leon-ai-icon.svg`, `leon-ai-lockup-light.svg`, `leon-ai-lockup-dark.svg`, plus a favicon from the icon, taken from `~/Desktop/leon-ai-logo/`.
- `.github/workflows/deploy.yml` (new): the workflow from the Astro GitHub Pages guide (`actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5`), triggered on push to `main`.
- `package-lock.json` committed, because `withastro/action` detects the package manager from the lockfile.

Sections of the page, top to bottom: hero (name, one-line pitch, Meetup CTA), current edition (date, venue, agenda), how a session works and who it is for, organizer, footer links (Meetup, LinkedIn, wmedia.es).

## How it looks

Chosen: **landing-mane**. Daylight stays as the discarded alternative. Changed during try: up to 1000px wide the lion is a 160px mark in the hero's top-right corner with the text below it, because behind the text it made the phone hero busy.

[landing-mane](look/landing-mane.html): dark, logo-native. Near-black ground, the lion's mane rotating slowly beside a huge "León AI." wordmark, a ticket card for the edition next to the agenda.

[landing-daylight](look/landing-daylight.html): light, poster-like. Sun-yellow hero with "Construimos con IA, en directo." and the full icon whose rays pulse; white body with a three-step timeline agenda and audience tags.

## Decisions

- **One landing page, no archive of past editions.** The human chose the minimum; history stays on Meetup.
- **Astro, static output.** The human chose it. It keeps the edition as data instead of hand-edited HTML, ships zero JS by default, and has an official GitHub Pages action. The simpler shape (plain HTML, no build) was offered and declined.
- **GitHub Pages at `<user>.github.io/leon-ai`, no custom domain.** The human chose it. Forces `base: '/leon-ai'` and base-aware links.
- **Spanish only.** In-person community in León.
- **Edition shown as written in `event.ts`, no date logic.** The human is running the event right now and wants nothing clever; when an edition passes, the file is edited by hand.
- **Sign-up happens on Meetup.** The site has no forms and every CTA links to Meetup. Fonts load from Google Fonts, so each visit makes a request to Google; accepted for now to keep the build trivial.
- **Look: landing-mane (dark, logo-native).** The human chose it; it is the most faithful to the icon's near-black ground.
- **Logo SVGs copied from the Desktop into `public/brand/` as is.** They are already final brand assets.

## Assumptions

1. **The repo will be pushed to GitHub under the human's account as `leon-ai`, with Pages source set to GitHub Actions.** If wrong, `site` and `base` change and the deploy never runs. GitHub user `juanwmedia` (from `gh api user`) is set in `astro.config.mjs:4-5`. Assumed until the first push and Pages run; updated at close.
2. **Astro 7.4.x with `withastro/action@v6` builds and deploys as the guide says.** If wrong, the workflow needs other versions. Local build tested: `package.json:12` pins 7.4.13 and `npm run build` builds the page (scaffold and page checks in `slices.md`). The Actions build and deploy are assumed until the first push.
3. **Node 24 is fine locally and in CI.** Tested locally on v24.20.0 (every slice check ran on it). CI assumed until the first workflow run.
4. **The footer's LinkedIn link is the organizer's profile, `https://www.linkedin.com/in/juanwmedia`, the only LinkedIn link on the Meetup group page.** Read from the group page's links and its structured data (`sameAs`). If a León AI page on LinkedIn is created later, the link changes. Tested: `src/pages/index.astro:134`, and the URL answered HTTP 200 during try.
5. **The Meetup event URL for #1 is `https://www.meetup.com/leon-ai/events/316984200/`.** Tested: `src/data/event.ts:27`; clicking "Reserva tu plaza" in try opened the Meetup page "León AI #1: Construimos en directo con IA agéntica".
