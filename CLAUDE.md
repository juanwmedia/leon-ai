# León AI

- With `base: '/leon-ai'`, Astro 7.4.13 sets `import.meta.env.BASE_URL` to `/leon-ai` with no trailing slash. Strip any trailing slash and join paths with an explicit `/`, as `src/pages/index.astro` does, or asset URLs break (`/leon-aifavicon.svg`).
