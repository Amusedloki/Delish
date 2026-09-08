# Delish — Premium Multi-Page Restaurant Website

A production-ready static website for **Delish**, a contemporary restaurant in
**Port Harcourt, Rivers State, Nigeria**. Seven real pages, shared design system,
data-driven menu and galleries.

Built with plain **HTML / CSS / JavaScript** (no build step, no framework) so it
runs anywhere — open `index.html` directly or serve the folder.

## Pages

| Page | File | Highlights |
| --- | --- | --- |
| Home | `index.html` | Cinematic hero slideshow, featured dishes, menu strip, specials, testimonials carousel, gallery preview + lightbox, location & map, final CTA |
| Menu | `menu.html` | Sticky category filter, animated grid, food detail modal |
| About | `about.html` | Story, philosophy, chef placeholder, values, ingredients |
| Specials | `specials.html` | Today's special, chef's picks, seasonal, limited experiences |
| Gallery | `gallery.html` | Filterable masonry grid + fullscreen lightbox (keyboard/swipe) |
| Testimonials | `testimonials.html` | Featured carousel + review grid |
| Contact | `contact.html` | Validated reservation request form, contact info, hours, map |

## Project structure

```
index.html … contact.html   Pages (shared header/footer markup)
css/style.css               Design system + all page styles + responsive + reduced-motion
js/data.js                  ALL content in one place: menu, specials, testimonials,
                            gallery, contact, social, hero images
js/main.js                  Global: header, mobile nav, page transitions, scroll reveal,
                            scroll progress, back-to-top, custom cursor, image fallback
js/render.js                Shared: dish cards, badges, stars, food modal, toast, carousel
js/lightbox.js              Shared lightbox
js/home.js  menu.js  gallery.js  testimonials.js  specials.js  contact.js   Page logic
```

## ⚠️ Placeholder content — replace before launch

No real Delish business data was supplied with the brief, so the following are
**clearly flagged placeholders** — do not publish them as real:

- **`js/data.js`** — the single source of truth:
  - `contact` — address, phone, email, opening hours (never publish invented hours)
  - `menu` — dish names, descriptions, prices (Naira)
  - `specials`, `testimonials` (sample reviews only), `gallery` (stock photos), `social`
- **Footer** (`Visit` column) and **JSON-LD** in each page mirror the data — update both.
- **Canonical URLs / OG tags** use the placeholder domain `https://www.delish.ng/`.
- **Menu prices** are sample placeholders; **hours** are placeholder values.
- Photos are hotlinked from Unsplash; swap in owned photography and keep `loading="lazy"`.
  A warm SVG fallback appears automatically if any image fails to load.
- The reservation form is a **frontend-only request** — it never claims a booking is
  confirmed. Wire it to a backend/email service when ready (see `js/contact.js`).

## Features

- Sticky frosted header (transparent over hero → solid on scroll), full-screen
  mobile nav with staggered links
- Fast 280 ms page transitions, scroll reveal + staggered cards, subtle parallax,
  Ken Burns hero slideshow, custom cursor (desktop only), scroll progress bar,
  back-to-top, toast notifications
- `prefers-reduced-motion` support throughout; touch/swipe support on carousels
  and lightbox; keyboard navigation (Esc, arrows, Enter) on modals/lightbox
- Semantic HTML, per-page titles/descriptions, Open Graph, JSON-LD `Restaurant`
  schema, skip link, visible focus states, aria labels
- Fully responsive: 1920 → 320 px, no horizontal overflow

## Dev artifact

- `preview.html` — a self-contained verification harness used during development (real homepage
  markup + inlined JS, unstyled). It exists so the site's runtime could be tested in a sandboxed
  preview that cannot serve sibling files. Safe to delete; the real site lives in `index.html`
  and `js/`.
- `probe.txt` — leftover from an earlier debugging session. Safe to delete.

## Run locally

No install needed — just open `index.html` in a browser, or serve the folder:

```bash
npm run serve      # serves the project root (requires Node/npx)
```
