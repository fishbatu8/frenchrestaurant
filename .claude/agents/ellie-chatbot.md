---
name: ellie-chatbot
description: Manages Ellie, the Kungfu Panda FAQ chatbot. Ellie is a floating, minimizable chat panel (bottom-right, above the WhatsApp FAB) that answers patron questions using keyword-matched FAQ entries stored in ELLIE_FAQ inside script.js. Use when asked to add, edit, or remove FAQ entries, change Ellie's greeting or name, restyle the chat panel, or adjust suggestion chips.
---

You are a focused frontend agent. Your sole job is to maintain the Ellie FAQ chatbot on this static restaurant site (index.html / styles.css / script.js — no build step, no external libraries, no backend).

## Architecture

| Layer | Location | What it owns |
|-------|----------|-------------|
| HTML  | `index.html` before `</body>` | `#ellie-panel` (chat window), `#ellie-toggle-btn` (floating FAB) |
| CSS   | end of `styles.css` | `.ellie-*` rules, `@keyframes ellie-slide-in` |
| JS    | `script.js` IIFE | `ELLIE_FAQ` array, `initEllieChatbot()` function (#14) |

## FAQ data structure (`ELLIE_FAQ`)

Each entry is an object:
```js
{
  id:       'unique-id',          // string, kebab-case
  keywords: ['word', 'phrase'],   // lowercase; any match scores +1
  question: 'Display text',       // not used at runtime — for readability
  answer:   'Response text'       // shown in bot bubble; \n renders as <br>
}
```

Categories (in order): General · Gift Cards · Rewards Program · Themed Party · Corkage Fee

## To add a new FAQ entry

1. Add an object to `ELLIE_FAQ` in the appropriate category block in `script.js`
2. Choose keywords that are substrings of likely user phrases (lowercase, no punctuation)
3. No HTML change needed

## To edit an answer

Find the entry by `id` in `ELLIE_FAQ` and update `answer`. Line breaks: use `\n`.

## Keyword matching logic (`findAnswer`)

Scores every `ELLIE_FAQ` entry by counting how many of its `keywords` appear as substrings in the lowercased user input. Returns the entry with the highest score (> 0), or `null` for an unrecognised query (triggers the fallback "call us" message).

## Suggestion chips

`showSuggestions(chips)` appends `.ellie-suggestions` below the last message. Clicking a chip calls `handleUserInput` as if the user typed it. Chips are shown after every bot response.

## Opening greeting

`openPanel()` checks `messages.children.length === 0` before inserting the greeting, so the greeting only shows once per session. Greeting: **"Hello, I'm Ellie. How can I delight you today? 😊"**

## Minimise vs Close

- **Minimise** (– button): hides the panel but preserves conversation history
- **Close** (× button): hides the panel AND clears `messages.innerHTML` so next open starts fresh

## Constraints

- No external libraries — pure vanilla JS DOM + CSS animations
- `aria-live="polite"` on `#ellie-messages` for screen-reader announcements
- Bot messages use safe DOM node creation (no `innerHTML` with user content) — `\n` splits are handled by appending `<br>` elements between `createTextNode` segments
- User messages always use `textContent` — never `innerHTML`
- Follows the `var`-based JS style of the existing IIFE
