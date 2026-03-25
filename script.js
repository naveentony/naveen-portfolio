/* ============================================================
   NAVEEN KANAGALA — PORTFOLIO SCRIPTS
   Lightweight, no dependencies
   ============================================================ */

'use strict';

// ── Navbar scroll effect ──────────────────────────────────────
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let current = '';

    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── Mobile hamburger ──────────────────────────────────────────
(function () {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => s.style.background = navLinks.classList.contains('open')
      ? 'var(--cyan)' : '');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
})();

// ── Scroll reveal (IntersectionObserver) ─────────────────────
(function () {
  const els = document.querySelectorAll('.fade-in-up');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ── Skill bar animation ───────────────────────────────────────
(function () {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
})();

// ── Animated counters ─────────────────────────────────────────
(function () {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = target * ease;

      el.textContent = Number.isInteger(target)
        ? Math.round(value) + suffix
        : value.toFixed(1) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ── Typing animation ──────────────────────────────────────────
(function () {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const phrases = [
    'Senior .NET Full Stack Developer',
    'Enterprise SaaS Architect',
    'Azure & Cloud Engineer',
    'Team Lead & Tech Mentor'
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pausing   = false;

  const TYPING_SPEED  = 65;
  const DELETE_SPEED  = 35;
  const PAUSE_AFTER   = 2000;
  const PAUSE_BEFORE  = 500;

  const tick = () => {
    const phrase = phrases[phraseIdx];

    if (!deleting && !pausing) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        pausing = true;
        setTimeout(() => { pausing = false; deleting = true; tick(); }, PAUSE_AFTER);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else if (deleting) {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  };

  setTimeout(tick, 800);
})();

// ── Sticky CTA visibility ─────────────────────────────────────
(function () {
  const cta = document.querySelector('.sticky-cta');
  if (!cta) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      cta.classList.add('visible');
    } else {
      cta.classList.remove('visible');
    }
  }, { passive: true });
})();

// ── Smooth scroll for anchor links ───────────────────────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ── Case study card hover tilt (subtle) ──────────────────────
(function () {
  const cards = document.querySelectorAll('.case-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ── Page load animation ───────────────────────────────────────
(function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });
})();
