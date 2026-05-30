# Frontend Design — High-Class Chinese Restaurant

Create a distinctive, production-grade frontend interface for a high-class Chinese restaurant. Avoid generic AI aesthetics. Produce real working code with exceptional visual quality.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or specific sections needed.

## Design Identity

This is a **luxury Chinese restaurant brand**. Every design decision must reflect that:

- **Tone**: Refined opulence. Think Michelin-star dim sum, private dining rooms, lacquered surfaces, aged gold, hand-painted silk. Never kitsch, never generic "Chinese restaurant red". Instead: deep cinnabar, burnished gold, ink black, aged parchment.
- **Differentiation**: The one unforgettable thing — a sense that this place is a destination, not just a restaurant. Convey exclusivity and centuries of culinary tradition in every pixel.

## Color Palette (CSS variables — always use these)

```css
:root {
  --color-crimson:     #8B1A1A;   /* deep cinnabar red — primary */
  --color-gold:        #C9963A;   /* burnished gold — accent */
  --color-gold-light:  #E8C87A;   /* pale gold — highlights */
  --color-ink:         #0D0D0D;   /* near-black — text on light */
  --color-parchment:   #F5EDD8;   /* warm cream — light backgrounds */
  --color-lacquer:     #1A0A0A;   /* very dark red-black — dark backgrounds */
  --color-jade:        #2D6A4F;   /* muted jade — rare accent only */
}
```

The dominant palette is **crimson + ink on parchment** (light mode) or **parchment + gold on lacquer** (dark mode). Never use purple, blue, or generic pastel palettes.

## Typography

- **Display / headings**: A high-contrast serif — `Cormorant Garamond`, `Playfair Display`, or `IM Fell English` (Google Fonts). Reserve for hero titles, section headers.
- **Body**: `Lato`, `EB Garamond`, or `Source Serif 4` — warm, readable, not sterile.
- **Accent / labels**: `Cinzel` or small-caps from the display font — for menu categories, navigation items.
- **NEVER use**: Inter, Roboto, Arial, system-ui, or any sans-serif that reads "tech startup".

Load fonts via Google Fonts CDN.

## Chinese Menu Imagery (Unsplash)

Use these Unsplash photo IDs for Chinese food and restaurant imagery. Pattern: `https://images.unsplash.com/photo-{id}?w={width}&q=85`

| Subject | Photo ID |
|---|---|
| Dim sum basket | 1563245372-f196517f0e2f |
| Peking duck | 1547592180-85f173990554 |
| Dumplings close-up | 1496116218422-d6c73a5c7960 |
| Chinese noodles | 1569050467447-ce54b3bbc37d |
| Luxury Chinese interior | 1414235077428-338989a2e8c0 |
| Tea ceremony | 1556679343-c7306c1976bc |
| Wonton soup | 1569718212165-3a8278d5f624 |
| Chinese BBQ pork | 1555126634-323283e090fa |
| Hot pot | 1476124369491-e7addf5db371 |
| Mapo tofu | 1565557623262-b51ff475583a |
| Elegant plating | 1504674900247-0877df9cc836 |
| Red lanterns exterior | 1578353020800-1f7e90a6e96a |

Hero backgrounds use `w=1920`, menu cards use `w=600`, thumbnails use `w=400`.

## Layout & Motion Principles

- **Spatial Composition**: Generous whitespace on parchment sections; controlled density on dark lacquer sections. Asymmetric grids. Overlap text over imagery with dark gradient overlays.
- **Dividers**: Use thin gold lines (`border: 1px solid var(--color-gold)`), SVG brush strokes, or ornamental rules — never plain `<hr>`.
- **Animations**: Slow, deliberate reveals (fade + slight upward drift, 600–800 ms). Hover states on cards: subtle gold border glow. No bouncy or fast animations — luxury is unhurried.
- **Dark overlay on hero**: Use `linear-gradient(to bottom, rgba(13,0,0,0.55) 0%, rgba(13,0,0,0.25) 60%, rgba(13,0,0,0.7) 100%)` over hero images.
- **CSS `prefers-reduced-motion`**: Always add a block that disables transitions and animations.

## Implementation Standards

- **HTML/CSS/JS only** unless the user specifies React/Vue. Keep it a single IIFE in `<script>` with `'use strict'`.
- **Responsive**: Three breakpoints — 1024 px (tablet), 768 px (mobile nav), 480 px (small phone).
- **Accessible**: Semantic HTML, `aria-label` on icon buttons, keyboard-navigable nav, focus rings styled to gold.
- **No external JS libraries** unless the user asks. CSS animations and `IntersectionObserver` for scroll effects.
- **Production-grade**: No placeholder lorem ipsum unless explicitly requested. Write real menu items, real section copy, real testimonials — all in the voice of a Michelin-calibre Chinese restaurant.

## Typical Sections (build what the user asks; this is a reference)

1. **Hero** — Full-viewport, Chinese food photography background, restaurant name in large serif display font, gold CTA button ("Reserve a Table").
2. **About / Philosophy** — Two-column: atmospheric image left, elegant copy right. Mention heritage, chef, provenance.
3. **Menu** — Three categories (Dim Sum, Signature Mains, Desserts). Card grid with Unsplash food images, dish name in display font, description in body, price in gold.
4. **Private Dining** — Dark lacquer background section, gold accents, CTA for enquiries.
5. **Testimonials / Awards** — Carousel or static quotes. Michelin star imagery if applicable.
6. **Reservation Form** — Date, time (17:00–22:30 × 30 min), guests (1–12), name, email, special requests. Client-side validation.
7. **Footer** — Dark background, logo, address, phone, social links, copyright.

## What to Avoid

- Generic "Chinese restaurant" clip-art aesthetics (dragon motifs, pixelated bamboo borders)
- Purple gradients, neon red, fluorescent colors
- Stock photo people smiling at cameras
- Cookie-cutter card layouts with no hierarchy
- Default browser blue focus rings (replace with gold)
- Font pairings that belong in a tech dashboard (Inter + Roboto)

## Execution

1. Confirm the specific component or page the user wants.
2. State your aesthetic direction in one sentence before coding (e.g., "Dark lacquer palette, Cormorant Garamond headings, slow fade-in reveals").
3. Output complete, working code. If HTML/CSS/JS — one self-contained file unless the user asks for separate files.
4. After the code, note any Unsplash IDs used and any Google Fonts loaded.
