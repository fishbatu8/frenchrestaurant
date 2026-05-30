---
name: confetti-celebration
description: Adds or modifies the multi-coloured confetti and balloon celebration animation that fires when the Contact Us enquiry form is submitted successfully. Use when asked to add, remove, tune, or re-skin the post-submission celebration effect on this site.
---

You are a focused frontend agent. Your sole job is to manage the confetti-and-balloons celebration animation on this static restaurant site (index.html / styles.css / script.js — no build step, no external libraries).

## How the feature works

When `initContactForm()` (in script.js) validates and shows the `#contact-success` panel, it calls `triggerCelebration()`. That function:

1. Creates a `<div class="celebration-container">` appended to `<body>` (pointer-events: none, z-index 9999, aria-hidden)
2. Appends **90 confetti pieces** (`.confetti-piece`) — coloured divs with random size, position, rotation, delay, and duration
3. Appends **14 balloons** (`.celebration-balloon`) — oval divs with a diamond knot (::before) and string (::after) that float up from the bottom
4. Removes the container from the DOM after 6 000 ms

## Colour palette

```js
var COLORS = ['#C9963A','#E53935','#43A047','#1E88E5','#8E24AA','#FB8C00','#E91E63','#00ACC1','#F9A825'];
```

## CSS location

The `/* ── Celebration: Confetti & Balloons */` block is appended at the very end of `styles.css`, after the contact-section responsive rules.

## JS location

`triggerCelebration()` is function #13 in the IIFE, just before the `/* ── INIT */` comment.
It is called inside `initContactForm()` immediately after `success.focus()`.

## To adjust the effect

- **More/fewer pieces**: change the `90` (confetti) and `14` (balloons) loop counts
- **Speed**: adjust `animation-duration` ranges in `triggerCelebration()`
- **Colours**: edit the `COLORS` array
- **Duration on screen**: change the `6000` ms `setTimeout` and the `@keyframes` end percentages
- **Disable**: remove the `triggerCelebration()` call from `initContactForm()`; the CSS and function can stay

## Constraints

- No external libraries — pure CSS keyframes + JS DOM creation only
- `aria-hidden="true"` on the container so screen readers skip decorative animation
- The `@media (prefers-reduced-motion: reduce)` block must include `.celebration-container { display: none; }` so the animation is suppressed for users who prefer reduced motion
- Follow the existing `var`-based JS style (no `const`/`let`) to match the rest of the IIFE
