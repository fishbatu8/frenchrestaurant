# Theme Toggle — Dark / Light Mode

Add a polished dark/light theme toggle to the Kungfu Panda restaurant site.

## Site context

Three-file static site — no build step, no bundler:

| File | Role |
|---|---|
| `index.html` | Markup: nav, hero, menu, testimonials, reservation form, footer |
| `styles.css` | All styling — CSS custom properties on `:root` |
| `script.js` | Single IIFE with `'use strict'`; eight init functions; one `DOMContentLoaded` listener |

The current default theme is **dark** (lacquer backgrounds, cream text, gold accents). All colour values live as CSS custom properties — never hard-coded. The site already has a hamburger nav toggle button; the theme toggle button sits beside it.

## Step 1 — `styles.css`: light-mode variable overrides

Add `html[data-theme="light"]` immediately after the `:root` block. Override only the tokens that change between dark and light — leave gold, fonts, spacing, and fluid sizes untouched:

```css
html[data-theme="light"] {
  --color-charcoal-dark: #FAF5EC;           /* body bg → parchment */
  --color-charcoal:      #F0E6D0;           /* section bg → lighter parchment */
  --color-cream:         #1A0A0A;           /* primary text → near-black */
  --color-cream-light:   #241010;
  --color-text-on-dark:  #2C1A0E;
  --color-text-muted:    #6A4A2A;
  --color-lacquer:       #EDE3CC;           /* card / panel bg → warm cream */
  --color-overlay:       rgba(240, 230, 200, 0.72);
  --color-border-gold:   rgba(168, 120, 48, 0.35);
  --color-error:         #a02020;
  --color-success:       #2a6a2a;
}
```

Also add a smooth transition on `body` so the switch doesn't flash:

```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

Inside the `prefers-reduced-motion` block (already at the bottom of `styles.css`), add:

```css
body { transition: none; }
```

## Step 2 — `styles.css`: toggle button styles

Add a `.theme-toggle` rule near the existing nav styles (after `.nav-toggle`):

```css
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  color: var(--color-cream);
  font-size: 1.1rem;
  line-height: 1;
  border-radius: 4px;
  transition: opacity var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover  { opacity: 0.75; }
.theme-toggle:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

Inside `prefers-reduced-motion`, add `.theme-toggle { transition: none; }`.

## Step 3 — `index.html`: toggle button in nav

Add the button **inside `<nav>`, directly before `</nav>`** (after the closing `</ul>`):

```html
      <button class="theme-toggle"
              id="theme-toggle"
              aria-label="Switch to light mode"
              aria-pressed="false">
        <span class="theme-icon" aria-hidden="true">☀</span>
      </button>
```

Use the Unicode sun `☀` (U+2600) — no emoji, no SVG needed.

## Step 4 — `script.js`: `initThemeToggle()`

Add this function to the IIFE (after `initFooterYear` is a good spot):

```js
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const icon = btn.querySelector('.theme-icon');
  const STORAGE_KEY = 'kp-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    btn.setAttribute('aria-pressed', String(isLight));
    btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    icon.textContent = isLight ? '☾' : '☀';
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || system);

  btn.addEventListener('click', function () {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}
```

**To prevent FOUC**: also add a tiny inline `<script>` in `<head>` (before any stylesheets), so the attribute is set before the first paint:

```html
<script>
  (function(){
    var t=localStorage.getItem('kp-theme');
    if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
    document.documentElement.setAttribute('data-theme',t);
  })();
</script>
```

Then call `initThemeToggle()` inside the existing `DOMContentLoaded` listener alongside the other init calls.

## Execution checklist

Work through these in order:

- [ ] Add `html[data-theme="light"]` token overrides to `styles.css`
- [ ] Add `body { transition: … }` and its reduced-motion override to `styles.css`
- [ ] Add `.theme-toggle` button styles and its reduced-motion override to `styles.css`
- [ ] Add the `<button id="theme-toggle">` to the `<nav>` in `index.html`
- [ ] Add the anti-FOUC inline `<script>` to `<head>` in `index.html`
- [ ] Add `initThemeToggle()` function to the IIFE in `script.js`
- [ ] Call `initThemeToggle()` inside `DOMContentLoaded` in `script.js`

After completing all steps, open `index.html` in a browser, toggle the theme, reload the page, and confirm: preference persists, no flash on load, both themes are readable.
