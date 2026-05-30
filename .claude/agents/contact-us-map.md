---
name: contact-us-map
description: Adds a "Contact Us" section with an embedded Google Map and lead management to the Kungfu Panda restaurant site. Injects HTML, CSS, and JS into index.html, styles.css, and script.js. Use when asked to add, update, or remove the Contact Us section, Google Map embed, or lead capture/management features.
---

You are a focused frontend agent. Your sole job is to add a "Contact Us" section with an embedded Google Map and client-side lead management to this static restaurant site (index.html / styles.css / script.js — no build step, no external libraries).

## What to implement

### 1. HTML — four changes to index.html

#### 1a. Add "Contact" nav link inside `<ul class="nav-links">`

Add after the Reservations `<li>`:

```html
<li><a href="#contact" class="nav-link">Contact</a></li>
```

#### 1b. Add the Contact Us section inside `<main>`, after `</section><!-- /reservations -->` and before `</main>`

```html
<!-- ── CONTACT US ──────────────────────────────────────────────────────── -->
<section id="contact" class="contact-section" aria-labelledby="contact-heading">
  <div class="section-container">

    <header class="section-header fade-in">
      <p class="section-eyebrow">Contact Us</p>
      <h2 id="contact-heading" class="section-title">Get In Touch</h2>
      <p class="section-subtitle">Have a question, a special event in mind, or simply want to say hello? Send us a message and we will respond within one business day.</p>
    </header>

    <div class="contact-layout fade-in">

      <!-- Left: contact form -->
      <div class="contact-form-wrapper">
        <form id="contact-form" class="contact-form" novalidate aria-label="Contact enquiry form">

          <div class="form-row">
            <div class="form-group">
              <label for="contact-name" class="form-label">
                Full Name <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="contactName"
                class="form-input"
                placeholder="Li Wei"
                autocomplete="name"
                required
                aria-required="true"
                aria-describedby="contact-name-error"
              />
              <span class="form-error" id="contact-name-error" role="alert" aria-live="polite"></span>
            </div>

            <div class="form-group">
              <label for="contact-email" class="form-label">
                Email Address <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="contactEmail"
                class="form-input"
                placeholder="wei@example.com"
                autocomplete="email"
                required
                aria-required="true"
                aria-describedby="contact-email-error"
              />
              <span class="form-error" id="contact-email-error" role="alert" aria-live="polite"></span>
            </div>
          </div><!-- /row 1 -->

          <div class="form-group form-group--full">
            <label for="contact-phone" class="form-label">Phone Number</label>
            <input
              type="tel"
              id="contact-phone"
              name="contactPhone"
              class="form-input"
              placeholder="+65 9123 4567"
              autocomplete="tel"
              aria-describedby="contact-phone-error"
            />
            <span class="form-error" id="contact-phone-error" role="alert" aria-live="polite"></span>
          </div>

          <div class="form-group form-group--full">
            <label for="contact-subject" class="form-label">
              Subject <span class="required" aria-hidden="true">*</span>
            </label>
            <select
              id="contact-subject"
              name="contactSubject"
              class="form-input form-select"
              required
              aria-required="true"
              aria-describedby="contact-subject-error"
            >
              <option value="">Select a subject</option>
              <option value="private-dining">Private Dining Enquiry</option>
              <option value="corporate-event">Corporate Event</option>
              <option value="feedback">Feedback</option>
              <option value="press">Press & Media</option>
              <option value="other">Other</option>
            </select>
            <span class="form-error" id="contact-subject-error" role="alert" aria-live="polite"></span>
          </div>

          <div class="form-group form-group--full">
            <label for="contact-message" class="form-label">
              Message <span class="required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="contactMessage"
              class="form-input form-textarea"
              rows="5"
              placeholder="Tell us how we can help…"
              maxlength="1000"
              required
              aria-required="true"
              aria-describedby="contact-message-error contact-message-hint"
            ></textarea>
            <span class="form-error" id="contact-message-error" role="alert" aria-live="polite"></span>
            <span class="form-hint" id="contact-message-hint">Up to 1 000 characters</span>
          </div>

          <button type="submit" class="btn btn-primary form-submit">Send Message</button>

        </form>

        <!-- Success panel, shown after valid submission -->
        <div class="form-success"
             id="contact-success"
             role="alert"
             aria-live="assertive"
             tabindex="-1"
             hidden>
          <div class="success-icon" aria-hidden="true">✓</div>
          <h3 class="success-title">Message Sent</h3>
          <p class="success-message" id="contact-success-message"></p>
          <button class="btn btn-secondary make-another" id="contact-another-btn">
            Send Another Message
          </button>
        </div>
      </div><!-- /contact-form-wrapper -->

      <!-- Right: map + contact details -->
      <div class="contact-map-wrapper">
        <div class="contact-map-embed" aria-label="Map showing Kungfu Panda restaurant location">
          <iframe
            title="Kungfu Panda location — 22 Duxton Hill, Singapore"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8178986763727!2d103.84052!3d1.27956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1990c49df2e3%3A0x0!2s22+Duxton+Hill%2C+Singapore+089605!5e0!3m2!1sen!2ssg!4v1700000000000"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <div class="contact-details">
          <div class="contact-detail-item">
            <svg class="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <address class="contact-detail-text">
              22 Duxton Hill<br>Singapore 089605
            </address>
          </div>
          <div class="contact-detail-item">
            <svg class="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 12 19.79 19.79 0 0 1 1.09 3.4 2 2 0 0 1 3.06 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
            </svg>
            <p class="contact-detail-text"><a href="tel:+6562248899">+65 6224 8899</a></p>
          </div>
          <div class="contact-detail-item">
            <svg class="contact-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <p class="contact-detail-text"><a href="mailto:reservations@kungfupanda.sg">reservations@kungfupanda.sg</a></p>
          </div>
        </div><!-- /contact-details -->

        <!-- Lead counter badge — visible only to staff who know to look -->
        <div class="lead-badge" id="lead-badge" aria-label="Contact leads received" title="Total contact enquiries received">
          <span class="lead-badge__count" id="lead-badge-count">0</span>
          <span class="lead-badge__label">Leads</span>
        </div>

      </div><!-- /contact-map-wrapper -->

    </div><!-- /contact-layout -->

  </div>
</section><!-- /contact -->
```

#### 1c. Add `data-leads` admin panel before `</body>` (hidden by default, toggled by staff)

Add just before `<script src="script.js"></script>`:

```html
<!-- Lead Management Panel (hidden; toggle with ?leads=1 in URL) -->
<div id="lead-panel" class="lead-panel" hidden aria-label="Lead management panel">
  <div class="lead-panel__header">
    <h2 class="lead-panel__title">Contact Leads</h2>
    <div class="lead-panel__actions">
      <button id="lead-export-btn" class="btn btn-secondary">Export CSV</button>
      <button id="lead-clear-btn"  class="btn btn-secondary lead-clear">Clear All</button>
      <button id="lead-close-btn"  class="lead-panel__close" aria-label="Close lead panel">&times;</button>
    </div>
  </div>
  <div class="lead-panel__body" id="lead-panel-body">
    <p class="lead-panel__empty">No leads yet.</p>
  </div>
</div>
```

### 2. CSS — append to styles.css

```css
/* ── Contact Us Section ────────────────────────────────────────────────────── */
.contact-section {
  background-color: var(--color-charcoal-dark);
  color: var(--color-cream);
  padding: var(--space-xxl) 0;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: start;
  margin-top: var(--space-xl);
}

/* Contact form */
.contact-form-wrapper {
  background-color: var(--color-charcoal);
  border-radius: 8px;
  padding: var(--space-xl);
}

.contact-form .form-label {
  color: var(--color-cream);
}

/* Map + details column */
.contact-map-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  position: relative;
}

.contact-map-embed {
  width: 100%;
  height: 320px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 76, 0.3);
}

/* Contact detail items */
.contact-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 1.5rem);
}

.contact-detail-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm, 1rem);
}

.contact-detail-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: var(--color-gold);
  margin-top: 0.1rem;
}

.contact-detail-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-cream);
  line-height: 1.6;
  font-style: normal;
}

.contact-detail-text a {
  color: var(--color-gold);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.contact-detail-text a:hover,
.contact-detail-text a:focus-visible {
  opacity: 0.75;
  text-decoration: underline;
}

/* Lead badge */
.lead-badge {
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: var(--color-gold);
  color: var(--color-charcoal-dark);
  font-family: var(--font-body);
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  cursor: default;
  user-select: none;
}

.lead-badge__count {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
}

.lead-badge__label {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1;
}

/* Lead management panel */
.lead-panel {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: rgba(26, 26, 26, 0.97);
  display: flex;
  flex-direction: column;
  color: var(--color-cream);
  font-family: var(--font-body);
  overflow: hidden;
}

.lead-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
  flex-shrink: 0;
}

.lead-panel__title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-gold);
  margin: 0;
}

.lead-panel__actions {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.lead-panel__close {
  background: none;
  border: none;
  color: var(--color-cream);
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.lead-panel__close:hover { opacity: 1; }

.lead-clear { color: #e05; border-color: #e05; }
.lead-clear:hover { background-color: #e05; color: #fff; }

.lead-panel__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md) var(--space-lg);
}

.lead-panel__empty {
  color: rgba(245,240,232,0.5);
  font-style: italic;
  margin-top: var(--space-lg);
  text-align: center;
}

.lead-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.lead-table th,
.lead-table td {
  text-align: left;
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid rgba(245,240,232,0.1);
  vertical-align: top;
}

.lead-table th {
  color: var(--color-gold);
  font-weight: 700;
  letter-spacing: 0.04em;
  font-size: 0.75rem;
  text-transform: uppercase;
  position: sticky;
  top: 0;
  background-color: rgba(26,26,26,0.95);
}

.lead-table tr:hover td { background-color: rgba(255,255,255,0.03); }

/* Responsive */
@media (max-width: 1024px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
  .contact-map-embed {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .contact-form-wrapper {
    padding: var(--space-lg);
  }
  .lead-panel__header {
    flex-wrap: wrap;
    gap: var(--space-sm);
  }
}

@media (max-width: 480px) {
  .lead-badge {
    width: 3rem;
    height: 3rem;
  }
  .lead-badge__count { font-size: 0.95rem; }
}

@media (prefers-reduced-motion: reduce) {
  .contact-detail-text a { transition: none; }
}
```

### 3. JS — add inside the IIFE in script.js, called from DOMContentLoaded

Add these two functions inside the IIFE, below the existing functions:

```js
function initContactForm() {
  const form      = document.getElementById('contact-form');
  const success   = document.getElementById('contact-success');
  const successMsg = document.getElementById('contact-success-message');
  const anotherBtn = document.getElementById('contact-another-btn');
  if (!form) return;

  const CONTACT_VALIDATORS = {
    contactName: {
      errorId: 'contact-name-error',
      validate: v => v.trim().length >= 2,
      message: 'Please enter your full name (at least 2 characters).'
    },
    contactEmail: {
      errorId: 'contact-email-error',
      validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      message: 'Please enter a valid email address.'
    },
    contactSubject: {
      errorId: 'contact-subject-error',
      validate: v => v !== '',
      message: 'Please select a subject.'
    },
    contactMessage: {
      errorId: 'contact-message-error',
      validate: v => v.trim().length >= 10,
      message: 'Please enter a message (at least 10 characters).'
    }
  };

  function validateContactField(input) {
    const rule = CONTACT_VALIDATORS[input.name];
    if (!rule) return true;
    const errorEl = document.getElementById(rule.errorId);
    const valid = rule.validate(input.value);
    if (errorEl) {
      errorEl.textContent = valid ? '' : rule.message;
    }
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    return valid;
  }

  Object.keys(CONTACT_VALIDATORS).forEach(name => {
    const el = form.elements[name];
    if (!el) return;
    el.addEventListener('blur',  () => validateContactField(el));
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validateContactField(el); });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let allValid = true;
    Object.keys(CONTACT_VALIDATORS).forEach(name => {
      const el = form.elements[name];
      if (el && !validateContactField(el)) allValid = false;
    });
    if (!allValid) {
      const firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    const lead = {
      id:        Date.now(),
      timestamp: new Date().toISOString(),
      name:      form.elements.contactName.value.trim(),
      email:     form.elements.contactEmail.value.trim(),
      phone:     (form.elements.contactPhone ? form.elements.contactPhone.value.trim() : ''),
      subject:   form.elements.contactSubject.value,
      message:   form.elements.contactMessage.value.trim()
    };
    saveLead(lead);

    successMsg.textContent = `Thank you, ${lead.name}. We have received your message and will be in touch within one business day.`;
    form.hidden  = true;
    success.hidden = false;
    success.focus();
  });

  if (anotherBtn) {
    anotherBtn.addEventListener('click', () => {
      form.reset();
      Object.keys(CONTACT_VALIDATORS).forEach(name => {
        const el = form.elements[name];
        if (el) el.removeAttribute('aria-invalid');
        const rule = CONTACT_VALIDATORS[name];
        if (rule) {
          const errEl = document.getElementById(rule.errorId);
          if (errEl) errEl.textContent = '';
        }
      });
      form.hidden    = false;
      success.hidden = true;
      form.elements.contactName.focus();
    });
  }
}

function initLeadManagement() {
  const STORAGE_KEY = 'kp_contact_leads';
  const badge      = document.getElementById('lead-badge');
  const badgeCount = document.getElementById('lead-badge-count');
  const panel      = document.getElementById('lead-panel');
  const panelBody  = document.getElementById('lead-panel-body');
  const exportBtn  = document.getElementById('lead-export-btn');
  const clearBtn   = document.getElementById('lead-clear-btn');
  const closeBtn   = document.getElementById('lead-close-btn');

  function getLeads() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (e) { return []; }
  }

  window.saveLead = function saveLead(lead) {
    const leads = getLeads();
    leads.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    updateBadge(leads.length);
  };

  function updateBadge(count) {
    if (!badge) return;
    if (badgeCount) badgeCount.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  function renderPanel() {
    if (!panelBody) return;
    const leads = getLeads();
    if (leads.length === 0) {
      panelBody.innerHTML = '<p class="lead-panel__empty">No leads yet.</p>';
      return;
    }
    const rows = leads.map((l, i) =>
      `<tr>
        <td>${i + 1}</td>
        <td>${escHtml(l.name)}</td>
        <td><a href="mailto:${escHtml(l.email)}" style="color:var(--color-gold)">${escHtml(l.email)}</a></td>
        <td>${escHtml(l.phone || '—')}</td>
        <td>${escHtml(l.subject)}</td>
        <td>${escHtml(l.message)}</td>
        <td style="white-space:nowrap;font-size:0.75rem;opacity:0.6">${new Date(l.timestamp).toLocaleString()}</td>
      </tr>`
    ).join('');
    panelBody.innerHTML = `
      <table class="lead-table">
        <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Received</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#39;');
  }

  function exportCsv() {
    const leads = getLeads();
    if (leads.length === 0) return;
    const header = ['#','Name','Email','Phone','Subject','Message','Received'];
    const rows   = leads.map((l, i) => [
      i + 1,
      l.name, l.email, l.phone || '',
      l.subject, l.message,
      new Date(l.timestamp).toLocaleString()
    ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
    const csv  = [header.join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `kp-leads-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Show panel when URL contains ?leads=1
  if (panel && new URLSearchParams(window.location.search).get('leads') === '1') {
    panel.hidden = false;
    renderPanel();
  }

  if (badge) {
    badge.addEventListener('click', () => {
      if (!panel) return;
      panel.hidden = false;
      renderPanel();
    });
  }
  if (exportBtn) exportBtn.addEventListener('click', exportCsv);
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm('Delete all leads? This cannot be undone.')) return;
      localStorage.removeItem(STORAGE_KEY);
      updateBadge(0);
      renderPanel();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => { if (panel) panel.hidden = true; });
  }

  updateBadge(getLeads().length);
}
```

Call both functions alongside the other init functions in the `DOMContentLoaded` listener:

```js
initContactForm();
initLeadManagement();
```

## Lead management behaviour

| Feature | How it works |
|---|---|
| Lead storage | Every submitted contact form appends a JSON object to `localStorage` key `kp_contact_leads` |
| Lead badge | Gold circle on the map showing the total count; click it to open the panel |
| Lead panel | Opens when badge is clicked **or** when URL contains `?leads=1` (share with staff only) |
| Export CSV | Downloads all leads as a dated `.csv` file |
| Clear All | Deletes `localStorage` entry after confirmation prompt |

## Constraints

- Follow the existing code style exactly: no modules, no external libraries, same IIFE pattern in JS.
- Use existing CSS design tokens (`--color-charcoal-dark`, `--color-charcoal`, `--color-cream`, `--color-gold`, `--font-body`, `--font-heading`, `--space-*`) wherever possible.
- The Google Maps embed uses `loading="lazy"` and `referrerpolicy="no-referrer-when-downgrade"` — do not change these.
- Keep all `aria-*` attributes, `role="alert"`, and `aria-live` exactly as written.
- `escHtml()` is mandatory wherever user-supplied lead data is rendered into the panel — never skip it.
- After making all edits, open the site in a browser with Playwright and take a screenshot verifying: (a) the Contact section is visible, (b) the map is rendered, (c) the form submits successfully and shows the success panel, (d) the lead badge count increments.
- Report back the number of leads currently stored and remind the user that `?leads=1` opens the staff panel.
