/* ==========================================================================
   Maison Lumière — script.js
   ========================================================================== */

(function () {
  'use strict';

  /* ── UTILITIES ──────────────────────────────────────────────────────────── */

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }

  /* ── 1. NAV SCROLL BEHAVIOUR ────────────────────────────────────────────── */
  /* Adds `.scrolled` class to the header once past 15% of the hero height,
     switching the nav from transparent to solid charcoal. */

  function initNavScroll() {
    var header = $('#site-header');
    var hero   = $('#hero');

    function update() {
      var threshold = hero ? hero.offsetHeight * 0.15 : 80;
      header.classList.toggle('scrolled', window.scrollY > threshold);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── 2. MOBILE NAV TOGGLE ───────────────────────────────────────────────── */

  function initMobileNav() {
    var toggle   = $('.nav-toggle');
    var navLinks = $('.nav-links');
    var links    = $$('.nav-link');

    function close() {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.forEach(function (link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        close();
        toggle.focus();
      }
    });
  }

  /* ── 3. SCROLL FADE-IN (Intersection Observer) ──────────────────────────── */
  /* Animates every .fade-in element into view as it enters the viewport.
     Falls back to instant-visible if IntersectionObserver is unavailable. */

  function initScrollAnimations() {
    var elements = $$('.fade-in');

    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); /* fire once only */
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ── 4. TESTIMONIALS CAROUSEL ───────────────────────────────────────────── */

  function initCarousel() {
    var track = $('#carousel-track');
    var dots  = $$('.dot');
    var total = dots.length;
    var current = 0;
    var timer   = null;

    function goTo(index) {
      current = ((index % total) + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (dot, i) {
        var active = i === current;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', String(active));
      });
    }

    function startAuto() {
      timer = setInterval(function () { goTo(current + 1); }, 4000);
    }

    function stopAuto() {
      clearInterval(timer);
      timer = null;
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.dataset.index, 10));
        stopAuto();
        startAuto();
      });
    });

    /* Pause autoplay on hover / focus so users can read comfortably */
    var wrapper = $('.carousel-wrapper');
    wrapper.addEventListener('mouseenter', stopAuto);
    wrapper.addEventListener('mouseleave', startAuto);
    wrapper.addEventListener('focusin',    stopAuto);
    wrapper.addEventListener('focusout',   startAuto);

    goTo(0);
    startAuto();
  }

  /* ── 5. FORM POPULATION ─────────────────────────────────────────────────── */
  /* Populates the guest count select (1–12) and time select (12:00–22:00
     in 30-minute steps). Also sets tomorrow as the minimum bookable date. */

  function populateFormSelects() {
    var guestsSelect = $('#guests');
    for (var i = 1; i <= 12; i++) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = i === 1 ? '1 Guest' : i + ' Guests';
      guestsSelect.appendChild(opt);
    }

    var timeSelect = $('#time');
    for (var h = 11; h <= 22; h++) {
      var mins = ['00', '30'];
      for (var m = 0; m < mins.length; m++) {
        if (h === 11 && mins[m] === '00') continue; /* start from 11:30 */
        if (h === 22 && mins[m] === '30') break;    /* cap at 22:00 */
        var value = pad2(h) + ':' + mins[m];
        var tOpt  = document.createElement('option');
        tOpt.value       = value;
        tOpt.textContent = formatTime12(h, mins[m]);
        timeSelect.appendChild(tOpt);
      }
    }

    var dateInput = $('#date');
    var tomorrow  = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90);
    dateInput.min = toISO(tomorrow);
    dateInput.max = toISO(maxDate);
  }

  function pad2(n) { return String(n).padStart(2, '0'); }

  function formatTime12(hour, min) {
    var suffix = hour < 12 ? 'AM' : 'PM';
    var h      = hour > 12 ? hour - 12 : hour;
    return h + ':' + min + ' ' + suffix;
  }

  function toISO(date) {
    return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
  }

  /* ── 6. FORM VALIDATION ─────────────────────────────────────────────────── */

  var VALIDATORS = {
    fullName: {
      errorId: 'full-name-error',
      validate: function (v) {
        var s = v.trim();
        return s.length >= 2 && /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]+$/.test(s);
      },
      message: 'Please enter your full name (at least 2 characters)'
    },
    email: {
      errorId: 'email-error',
      validate: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
      },
      message: 'Please enter a valid email address'
    },
    phone: {
      errorId: 'phone-error',
      validate: function (v) {
        return /^[\+\d][\d\s\-\(\)]{6,18}$/.test(v.trim());
      },
      message: 'Please enter a valid phone number (e.g. +65 9123 4567)'
    },
    date: {
      errorId: 'date-error',
      validate: function (v) {
        if (!v) return false;
        var parts    = v.split('-');
        var selected = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        var today    = new Date();
        today.setHours(0, 0, 0, 0);
        return selected > today;
      },
      message: 'Please select a future date'
    },
    time: {
      errorId: 'time-error',
      validate: function (v) { return v !== ''; },
      message: 'Please select a dining time'
    },
    guests: {
      errorId: 'guests-error',
      validate: function (v) {
        var n = parseInt(v, 10);
        return v !== '' && !isNaN(n) && n >= 1 && n <= 12;
      },
      message: 'Please select the number of guests'
    }
  };

  function validateField(input) {
    var spec = VALIDATORS[input.name];
    if (!spec) return true; /* optional field — always passes */

    var valid   = spec.validate(input.value);
    var errorEl = document.getElementById(spec.errorId);

    input.classList.toggle('invalid', !valid);
    input.classList.toggle('valid',    valid);

    if (errorEl) {
      errorEl.textContent = valid ? '' : spec.message;
    }
    return valid;
  }

  function initFormValidation() {
    var form   = $('#reservation-form');
    var inputs = $$('[required]', form);

    inputs.forEach(function (input) {
      /* Validate on blur only when the field has been touched */
      input.addEventListener('blur', function () {
        if (input.value !== '' || input.classList.contains('invalid')) {
          validateField(input);
        }
      });

      /* Clear error as the user types / changes a selection */
      input.addEventListener('input', function () {
        if (input.classList.contains('invalid')) validateField(input);
      });

      input.addEventListener('change', function () {
        if (input.classList.contains('invalid') || input.tagName === 'SELECT') {
          validateField(input);
        }
      });
    });
  }

  /* ── 7. FORM SUBMISSION ─────────────────────────────────────────────────── */

  function initFormSubmission() {
    var form          = $('#reservation-form');
    var successPanel  = $('#form-success');
    var successMsg    = $('#success-message');
    var makeAnotherBtn = $('#make-another-btn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Validate every required field */
      var inputs   = $$('[required]', form);
      var allValid = true;

      inputs.forEach(function (input) {
        if (!validateField(input)) allValid = false;
      });

      if (!allValid) {
        var firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      /* Build the success message with the submitted values */
      var name      = $('#full-name').value.trim();
      var guests    = parseInt($('#guests').value, 10);
      var guestsTxt = guests === 1 ? '1 guest' : guests + ' guests';
      var dateStr   = formatDateDisplay($('#date').value);
      var timeStr   = formatTime12Display($('#time').value);

      successMsg.textContent =
        'Thank you, ' + name + '! Your reservation request for ' +
        guestsTxt + ' on ' + dateStr + ' at ' + timeStr +
        ' has been received. We will send a confirmation to your email shortly.';

      form.hidden         = true;
      successPanel.hidden = false;
      successPanel.focus();
    });

    /* Reset everything when the user wants to make another booking */
    makeAnotherBtn.addEventListener('click', function () {
      form.reset();

      $$('.form-input', form).forEach(function (el) {
        el.classList.remove('valid', 'invalid');
      });
      $$('.form-error', form).forEach(function (el) {
        el.textContent = '';
      });

      successPanel.hidden = true;
      form.hidden         = false;
      $('#full-name').focus();
    });
  }

  /* Formats "2026-06-15" → "Monday, 15 June 2026" */
  function formatDateDisplay(dateStr) {
    if (!dateStr) return dateStr;
    var parts = dateStr.split('-');
    var date  = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    return date.toLocaleDateString('en-SG', {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric'
    });
  }

  /* Formats "19:30" → "7:30 PM" */
  function formatTime12Display(timeStr) {
    if (!timeStr) return timeStr;
    var parts  = timeStr.split(':');
    var h      = parseInt(parts[0], 10);
    var min    = parts[1];
    var suffix = h < 12 ? 'AM' : 'PM';
    var dh     = h > 12 ? h - 12 : h;
    return dh + ':' + min + ' ' + suffix;
  }

  /* ── 8. FOOTER YEAR ─────────────────────────────────────────────────────── */

  function initFooterYear() {
    var el = $('#copyright-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── INIT ───────────────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initMobileNav();
    initScrollAnimations();
    initCarousel();
    populateFormSelects();
    initFormValidation();
    initFormSubmission();
    initFooterYear();
  });

})();
