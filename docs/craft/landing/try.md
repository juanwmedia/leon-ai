# León AI landing: try

Run with `npm run build` then `npx astro preview --port 4321`, opened at `http://localhost:4321/leon-ai/` in Claude in Chrome. Nothing left this machine except following the page's own links to Meetup, LinkedIn and wmedia.es, and the page's own font requests to Google Fonts. Browser measurements below were taken live in that session; the screenshots in `try/` are their record.

## Desktop, top to bottom (1280px): passed

Hero, current edition, "La sala decide", organizer and footer all render as in the mane mockup, plus two differences: a "Reserva tu plaza" CTA in the ticket (`src/pages/index.astro:88`, from the plan's "CTA to `event.meetupUrl`") and `margin: 0` on body. No console errors, 0 `<script>` tags, no horizontal scroll (scrollWidth 1280 = clientWidth 1280). Archivo 800/900, IBM Plex Sans 400/500 and IBM Plex Mono 500 loaded.
Proof: [desktop-hero](try/desktop-hero.jpg), [desktop-bottom](try/desktop-bottom.jpg).

## Edition data: passed

The ticket shows "León AI #1" and `<time datetime="2026-11-19T18:00:00+01:00">Jueves 19 nov · 18:00</time>`; the agenda shows 18:00, 18:15 and 19:30, each in its own `<time>` with its label. Venue and "Gratis. Plazas limitadas." present.

## Links: passed

Five links: "Apúntate en Meetup" and footer "Meetup" go to `https://www.meetup.com/leon-ai/`, "Reserva tu plaza" to `https://www.meetup.com/leon-ai/events/316984200/`, LinkedIn to `https://www.linkedin.com/in/juanwmedia`, wmedia.es to `https://wmedia.es/`. Clicking "Reserva tu plaza" opened the Meetup page titled "León AI #1: Construimos en directo con IA agéntica, Thu, Nov 19, 2026, 6:00 PM". With `curl -L`, the Meetup group and LinkedIn answered 200 and wmedia.es redirected (302) to `https://wmedia.es/en`, which answered 200.

## Base path and favicon: passed

Served HTML has `<link rel="icon" type="image/svg+xml" href="/leon-ai/favicon.svg">`, and that URL answers 200 `image/svg+xml`. The tab showed an orange icon instead because the Chrome extension swaps the favicon of tabs it controls; the page's own link is correct.

## Motion: passed

Computed `animation-name` is `spin` on `.rays` and `none` on `.face`: only the mane rotates, the face stays upright.

## Reduced motion: passed (by stylesheet, not emulated)

The only animation rule lives inside `@media (prefers-reduced-motion: no-preference)` and targets `.rays`, so with reduced motion nothing moves. Claude in Chrome cannot emulate the media feature, so the rule was read from the live stylesheets instead of toggled.

## Mobile 375px and 400px: passed after a fix

Chrome's window cannot go below 614px, so the page was loaded in a same-origin iframe of 375×812 and 400×812 and measured inside. At both widths scrollWidth equals the viewport (375, 400), no element outside the decorative lion crosses the right edge, the gutter is 16px, the edition grid collapses to one column, h1 is 56px. Buttons are 57px tall; footer links 24px tall.
Proof: [mobile-375-hero](try/mobile-375-hero.jpg), [mobile-375-edition](try/mobile-375-edition.png), [mobile-375-bottom](try/mobile-375-bottom.png).

**Finding, fixed during try at the human's request:** on phones the lion (the old mobile rule set `.rays, .face { right: -320px; opacity: .45; }`) sat behind the hero text, face under the lede and rays across "León AI." (see [mobile-375-hero](try/mobile-375-hero.jpg)). Fixed in `src/pages/index.astro`: up to 1000px wide the lion is 160px in the hero's top-right corner with the text pushed below it; above 1000px it stays 640px, vertically centred beside the text. The centring moved from `transform` to the `translate` property and the spin keyframe to `rotate`, so the corner layout cannot fight the animation. Measured in iframes at 375, 768, 900, 1000, 1001, 1024, 1280 and 1600px: at every width the lion is either fully above the eyebrow (up to 1000px) or its leftmost ray is right of the rightmost text glyph (from 1001px), and scrollWidth equals the viewport. Only `.rays` animates. The page check still prints its eight lines.
Proof: [mobile-375-hero-fixed](try/mobile-375-hero-fixed.png).

## Accessibility basics: passed

`lang="es"`, title "León AI", meta description present. Headings: one h1 ("León AI."), then h2 "Próxima edición" and h2 "La sala decide". The three lion SVGs are `aria-hidden="true"`. Every link has visible text. Keyboard Tab lands on "Apúntate en Meetup" with `:focus-visible` and a 2px solid sun-yellow outline. Contrast on the near-black ground: h1 and lede 16.4:1, CTA 12.9:1, agenda times 12.9:1, eyebrow 8.7:1, body copy 7.6:1, venue 6.8:1.
Proof: [focus-visible](try/focus-visible.png).

## Safari / iPhone: skipped

Only Chrome is available in this session. The lion's colours come from `var(--amber|--sun|--ink)` inside SVG `fill`/`stroke` attributes, which Chromium honours; Safari was not tried. Open it on an iPhone after deploy and check the lion is amber and yellow, not black.

## Live deploy on GitHub Pages: skipped

The repo has no remote and nothing is committed; publishing needs the human's push and the Pages source set to GitHub Actions.
