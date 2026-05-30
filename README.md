# Kungfu Panda

A single-page luxury Chinese restaurant website with authentic Hunan cuisine, built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

**Live site:** https://fishbatu8.github.io/frenchrestaurant/

![Kungfu Panda screenshot](screenshot.png)

---

## Features

- Full-viewport hero with red lanterns photography and cinematic gradient overlay
- Menu section with 9 Hunan dishes across 3 categories (前菜 Starters, 主菜 Signatures, 甜品 Desserts)
- Luxury Chinese palette — deep cinnabar crimson, burnished gold, lacquer & parchment
- Cinzel + Cormorant Garamond typography for refined, authentic feel
- Auto-rotating testimonials carousel
- Client-side reservation form with inline validation (11:30 – 22:00 time slots)
- Contact Us section with enquiry form and embedded Google Maps (22 Duxton Hill)
- WhatsApp Business floating chat button (bottom-right, links to WhatsApp with pre-filled message)
- Dark / Light theme toggle — persists preference via `localStorage`, no flash on reload
- Fully responsive (desktop / tablet / mobile)
- Accessible — keyboard navigable, ARIA labels, focus management, `prefers-reduced-motion` support

## Project Structure

```
├── index.html        # All markup
├── styles.css        # All styling and design tokens
├── script.js         # All behaviour (nav, carousel, forms, theme toggle)
├── screenshot.png    # Live site screenshot
├── .claude/
│   ├── agents/       # Custom Claude Code subagents
│   └── commands/     # Project slash-commands
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions → GitHub Pages
```

## Running Locally

Open `index.html` directly in a browser — no server or install step needed.

```
file:///C:/Users/<you>/path/to/index.html
```

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the included GitHub Actions workflow (`.github/workflows/deploy.yml`).

The workflow uses the official GitHub Pages actions:
- `actions/checkout@v4`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`
