// ── NAVBAR SCROLL ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER MENU ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

function closeMobileMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ── FAQ ACCORDION ─────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // open clicked (unless it was already open)
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// ── SCROLL FADE-IN ────────────────────────────
const fadeEls = document.querySelectorAll(
  '.feature-card, .step, .testi-card, .faq-item, .pricing-card, .trust-badge, .assurance-item, .hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats, .hero-visual'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => io.observe(el));

// ── SMOOTH ANCHOR SCROLL ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── COUNTER ANIMATION ─────────────────────────
function animateCount(el, target, suffix) {
  let current = 0;
  const inc = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (current >= target) clearInterval(timer);
  }, 24);
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(n => {
        const raw = n.textContent.trim();
        if (raw.includes('5,000')) animateCount(n, 5000, '+');
        else if (raw.includes('12L')) { n.textContent = '12L+'; }
        else if (raw.includes('28'))  animateCount(n, 28, '');
      });
      statsObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.getElementById('hero-stats');
if (statsEl) statsObs.observe(statsEl);
