# Maison Lumière

A single-page French restaurant website with online reservation enquiry, built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

**Live site:** https://fishbatu8.github.io/frenchrestaurant/

---

## Features

- Full-viewport hero with parallax background
- Menu section with 9 dishes across 3 categories (Entrées, Plats, Desserts)
- Auto-rotating testimonials carousel
- Client-side reservation form with inline validation
- Fully responsive (desktop / tablet / mobile)
- Accessible — keyboard navigable, ARIA labels, focus management

## Project Structure

```
├── index.html   # All markup
├── styles.css   # All styling and design tokens
├── script.js    # All behaviour (nav, carousel, form validation)
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions → GitHub Pages
```

## Running Locally

Open `index.html` directly in a browser — no server or install step needed.

```powershell
Start-Process "index.html"
```

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the included GitHub Actions workflow.
