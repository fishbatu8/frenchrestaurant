# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the site

Open `index.html` directly in a browser — there is no build step, no server, and no package manager. On Windows:

```powershell
Start-Process "index.html"
```

## Architecture

Three files, no dependencies beyond Google Fonts CDN and Unsplash image URLs.

| File | Role |
|---|---|
| `index.html` | All markup: nav, hero, menu (9 dishes), testimonials carousel, reservation form, footer |
| `styles.css` | All styling: design tokens, layout, animations, three responsive breakpoints |
| `script.js` | All behaviour: nav scroll, mobile nav, scroll animations, carousel, form population, validation, submission |

### CSS design tokens (`styles.css` `:root`)

Every colour, font, spacing step, and transition lives as a CSS custom property. Touch these before reaching for hard-coded values anywhere else. Key tokens:

- Palette: `--color-charcoal-dark` (#1a1a1a) / `--color-charcoal` (#2c2c2c) / `--color-cream` (#f5f0e8) / `--color-gold` (#c9a84c)
- Fonts: `--font-heading` (Cormorant Garamond serif) / `--font-body` (Lato sans-serif)
- Fluid sizes: `--fs-hero-title`, `--fs-section-title` use `clamp()` — do not replace with fixed `px` values
- Spacing scale: `--space-xs` through `--space-xxl` (0.5 rem → 8 rem)

### Responsive breakpoints (`styles.css`)

| Breakpoint | Changes |
|---|---|
| `max-width: 1024px` | Footer → 2-col; menu grid → 2-col |
| `max-width: 768px` | Hamburger nav; menu grid → 1-col; form rows stack; hero `background-attachment: scroll` (required for iOS Safari) |
| `max-width: 480px` | Footer → 1-col; CTA/submit buttons stretch full width |

A `prefers-reduced-motion` block at the bottom of `styles.css` disables all transitions and animations.

### JavaScript modules (`script.js`)

A single IIFE with `'use strict'`. Eight named init functions, all called from one `DOMContentLoaded` listener. No module system — keep additions in the same IIFE style.

| Function | What it owns |
|---|---|
| `initNavScroll()` | Toggles `.scrolled` on `#site-header` past 15% of hero height |
| `initMobileNav()` | Hamburger toggle, `.nav-links.open` overlay, Escape key, body scroll-lock |
| `initScrollAnimations()` | `IntersectionObserver` on every `.fade-in`; adds `.visible` once; graceful no-op fallback |
| `initCarousel()` | `setInterval(4s)`, `translateX` slide, dot sync, pause on hover/focus |
| `populateFormSelects()` | Builds guest options (1–12), time options (12:00–22:00 × 30 min), sets date `min`/`max` |
| `validateField(input)` | Single source of truth for all field validation; reads `VALIDATORS[input.name]` |
| `initFormSubmission()` | Submit → validate all → show `#form-success`; reset button restores form state |
| `initFooterYear()` | Writes `new Date().getFullYear()` to `#copyright-year` |

### Form validation contract

`VALIDATORS` (in `script.js`) is keyed by the input's `name` attribute. Each entry has:
- `errorId` — must match the `id` of the corresponding `<span class="form-error">` in the HTML
- `validate(value)` — returns boolean
- `message` — displayed on failure

To add or change a field: update `VALIDATORS`, add the matching `<span id="…-error">` in the HTML, and wire `aria-describedby` on the `<input>`.

### Scroll animations

Add `class="fade-in"` to any block-level element to opt into the entrance animation. The JS observer adds `.visible` once the element crosses the viewport threshold — no other setup needed.

### Unsplash images

All Unsplash URLs use the pattern `https://images.unsplash.com/photo-{id}?w={width}&q=80`. Menu card images use `w=600`; the hero uses `w=1920`. The hero is a CSS `background-image` on `.hero-section` (not an `<img>`), so the dark overlay div works cleanly on top of it.
