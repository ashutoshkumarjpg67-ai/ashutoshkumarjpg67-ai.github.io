# Bittu Defence Academy — website

Phase one of the academy site: design system, shared layout and all six pages,
with a static stadium hero. The interactive 3D hero and scroll-choreography are
phase two.

## Where things live

| What | Where |
| --- | --- |
| App source | `apps/bittu-defence-academy/` (this folder) |
| Published site | `/bittu-defence-academy/` at the repo root (build output, committed) |
| Academy facts | `src/data/academy.ts` |
| Programmes | `src/data/programs.ts` |
| Gallery | `src/data/gallery.ts` |
| Videos | `src/data/videos.ts` |
| Navigation | `src/data/nav.ts` |

The repository is a GitHub Pages **user** site, so the academy site is served
from a sub-path. `vite.config.ts` sets the production base to
`/bittu-defence-academy/`, and `src/main.tsx` derives the router basename from
it. Do not change one without the other.

## Local development

```bash
cd apps/bittu-defence-academy
npm install
npm run dev          # http://localhost:5173
```

In development the app is served from `/`; the sub-path only applies to the
production build.

## Build and publish

```bash
npm run build
```

This runs the type check, builds with Vite, then `scripts/publish.mjs`:

1. deletes the previous `/bittu-defence-academy/` output,
2. copies the fresh build there,
3. writes a static `index.html` for each route (`about`, `programs`, `gallery`,
   `videos`, `contact`) so deep links and refreshes work on GitHub Pages, which
   has no rewrite rules,
4. writes `404.html` so unknown paths render the site's own 404 page.

Commit the regenerated `/bittu-defence-academy/` folder along with source
changes.

## Content rules

The brief for this site is that nothing about the academy is invented. Please
keep it that way when editing:

- **Never add** fees, batch timings, duration, eligibility, coach names,
  student counts, achievements, testimonials or a street address.
- Unknown values stay out of the UI, or as an explicit "confirmed by the
  academy" note.
- Programmes are listed as **training categories** the academy shares publicly.
  `academy.provisionalNote` appears under every programme listing — keep it.
- Videos have `youtubeId: null` until a real upload exists. Cards render a
  "video coming soon" state instead of a dead player. Set the id in
  `src/data/videos.ts` and the modal starts working.
- The footer and Videos page show the YouTube channel as pending until
  `academy.youtube.url` is filled in.

## Replacing sample visuals

Programme, gallery and hero imagery is currently drawn as SVG "plates"
(`src/components/common/VisualPlate.tsx` and `src/components/hero/`). They are
deliberately labelled as sample visuals in the UI.

To use academy photographs:

1. Put optimised images in `public/images/` (WebP or AVIF, plus a JPEG fallback,
   roughly 1400px on the long edge).
2. Change the data entries from `art: 'track'` to an image path, and render an
   `<img>` with explicit `width`/`height` and `loading="lazy"` in place of
   `VisualPlate` for content images.
3. Remove the "sample visual" captions once real media is in place.

## Deployment

Target: `https://<user>.github.io/bittu-defence-academy/`.

Any static host works as long as the site is served from
`/bittu-defence-academy/` and the per-route `index.html` files are uploaded.
If the site moves to its own domain or repo root, change `base` in
`vite.config.ts` to `/`, rebuild, and drop the sub-path from the published
folder.

## The 3D hero (phase two)

The hero is a procedural WebGL stadium: track, lane markings, stepped stands and
floodlight masts, plus a stylised sprinter, with a scroll-driven camera and a
small pointer parallax. Files:

| File | Role |
| --- | --- |
| `src/components/hero/HeroVisual.tsx` | Gatekeeper: decides static vs WebGL, fades the scene in, error boundary |
| `src/components/3d/StadiumScene.tsx` | Canvas, lights, composition |
| `src/components/3d/TrackEnvironment.tsx` | Stadium geometry |
| `src/components/3d/AthleteModel.tsx` | Loads the CC0 rigged athlete and plays its jog loop |
| `src/components/3d/CameraRig.tsx` | Scroll progress + pointer parallax |
| `src/lib/webgl.ts` | WebGL and data-saver probes |

It is loaded with `React.lazy`, so three.js sits in its own chunk
(`StadiumScene-*.js`, ~223 kB gzip) that the initial page never downloads. The
athlete model is fetched imperatively after the scene mounts, so the stadium
renders first and the figure appears when it arrives.

**Fallbacks.** The static SVG hero is always rendered first and stays as the
permanent fallback. The WebGL scene is only requested when: motion is allowed
(`prefers-reduced-motion` is not `reduce`), WebGL is available, and the
connection is not data-saver/2G. If the scene throws at runtime, the error
boundary unmounts it and the static hero remains. Narrow/coarse-pointer devices
render the stadium without the athlete.

**Rendering cost.** The rigged figure needs continuous frames, so the canvas runs
while the hero is on screen and switches to `frameloop="never"` when an
IntersectionObserver reports the hero has scrolled away. That is the only
continuous loop on the page. No shadow maps, no post-processing, primitive
stadium geometry, lower DPR cap on mobile.

## Known limitations

- Document titles and descriptions are set per route in the browser. Open Graph
  tags are static, so link previews in WhatsApp and similar show the academy
  defaults rather than the specific page. Prerendering is the fix.
- The athlete is a CC0 rigged model (`public/models/athlete-jog.glb`, 4.85 MB)
  with a single looping jog clip. Provenance, licence and the optimisation
  command are recorded in `public/models/README.md`. The model downloads only
  after the WebGL hero mounts, and never on mobile-sized screens (the figure is
  hidden there), so it is not part of the initial page weight.
- An unmatched URL such as `/bittu-defence-academy/typo/` is handled by GitHub
  Pages' own 404, because Pages only reads a `404.html` at the repository root.
  The site's own 404 page renders for in-app navigation only.
