---
name: whatsapp-chatbot
description: Adds a floating WhatsApp Business chatbot icon in the bottom-right corner of the site. Injects the HTML button, CSS styles, and JS click handler into index.html, styles.css, and script.js. Use when asked to add, update, or remove the WhatsApp floating button or chatbot widget.
---

You are a focused frontend agent. Your sole job is to add a floating WhatsApp Business chatbot icon in the bottom-right corner of this static restaurant site (index.html / styles.css / script.js — no build step).

## What to implement

### 1. HTML — add before `</body>` in index.html

```html
<!-- ── WHATSAPP FLOATING BUTTON ──────────────────────────────────────────── -->
<a id="whatsapp-fab"
   class="whatsapp-fab"
   href="https://wa.me/6500000000?text=Hello%2C%20I%27d%20like%20to%20make%20a%20reservation%20at%20Kungfu%20Panda."
   target="_blank"
   rel="noopener noreferrer"
   aria-label="Chat with us on WhatsApp">
  <svg class="whatsapp-fab__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.023 7.774L0 32l8.476-2.001A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.787-1.864l-.487-.29-5.03 1.187 1.22-4.898-.318-.503A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.26-9.927c-.398-.2-2.355-1.162-2.72-1.294-.364-.133-.63-.2-.895.2-.266.397-1.03 1.294-1.263 1.56-.232.265-.464.298-.862.1-.398-.2-1.681-.62-3.203-1.98-1.183-1.057-1.982-2.363-2.214-2.76-.232-.398-.025-.613.175-.81.179-.179.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.498-.034-.697-.1-.2-.895-2.16-1.228-2.957-.323-.776-.651-.671-.895-.683l-.763-.013c-.265 0-.697.1-1.062.498-.364.398-1.394 1.362-1.394 3.322s1.428 3.853 1.627 4.119c.2.265 2.81 4.29 6.81 6.018.952.41 1.695.655 2.274.838.955.304 1.825.26 2.512.158.766-.114 2.355-.963 2.688-1.894.332-.93.332-1.728.232-1.894-.099-.166-.364-.265-.762-.465z"/>
  </svg>
  <span class="whatsapp-fab__tooltip">Chat on WhatsApp</span>
</a>
```

**Replace `6500000000` with the restaurant's actual WhatsApp Business number** (country code + number, no `+` or spaces).

### 2. CSS — append to styles.css

```css
/* ── WhatsApp Floating Action Button ──────────────────────────────────────── */
.whatsapp-fab {
  position: fixed;
  bottom: var(--space-lg, 2rem);
  right: var(--space-lg, 2rem);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: #25d366;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.whatsapp-fab:hover,
.whatsapp-fab:focus-visible {
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.whatsapp-fab__icon {
  width: 2rem;
  height: 2rem;
  fill: #fff;
  flex-shrink: 0;
}

.whatsapp-fab__tooltip {
  position: absolute;
  right: calc(100% + 0.75rem);
  white-space: nowrap;
  background-color: var(--color-charcoal-dark, #1a1a1a);
  color: #fff;
  font-family: var(--font-body, sans-serif);
  font-size: 0.8rem;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transform: translateX(6px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.whatsapp-fab:hover .whatsapp-fab__tooltip,
.whatsapp-fab:focus-visible .whatsapp-fab__tooltip {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 480px) {
  .whatsapp-fab {
    bottom: 1.25rem;
    right: 1.25rem;
    width: 3rem;
    height: 3rem;
  }
  .whatsapp-fab__icon {
    width: 1.75rem;
    height: 1.75rem;
  }
  .whatsapp-fab__tooltip {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp-fab,
  .whatsapp-fab__tooltip {
    transition: none;
  }
}
```

### 3. JS — add inside the IIFE in script.js, called from DOMContentLoaded

```js
function initWhatsAppFab() {
  const fab = document.getElementById('whatsapp-fab');
  if (!fab) return;
  fab.addEventListener('click', () => {
    // analytics hook — replace with real tracking if needed
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', { event_category: 'engagement' });
    }
  });
}
```

Call it alongside the other init functions:
```js
initWhatsAppFab();
```

## Constraints

- Follow the existing code style exactly: no modules, no external libraries, same IIFE pattern in JS.
- Use existing CSS design tokens (`--color-charcoal-dark`, `--font-body`, `--space-lg`) wherever possible.
- Do not hardcode colours beyond the official WhatsApp green (`#25d366`) and white.
- Keep the `aria-label` on the `<a>` and `aria-hidden="true"` on the SVG for screen-reader accessibility.
- After making all three edits, open the site in a browser with Playwright and take a screenshot to verify the button appears in the bottom-right corner.
- Report the WhatsApp number that was used and remind the user to replace it if it is the placeholder.
