// ═══════════════════════════════════════════════════
//  COOKIE BANNER
// ═══════════════════════════════════════════════════
function closeCookies() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('hidden');
}

// ═══════════════════════════════════════════════════
//  STICKY HEADER + BACK TO TOP
// ═══════════════════════════════════════════════════
const header    = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);
  if (backToTop) backToTop.classList.toggle('show', y > 400);
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ═══════════════════════════════════════════════════
//  HAMBURGER MENU
// ═══════════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mainNav.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// ═══════════════════════════════════════════════════
//  SEARCH TOGGLE
// ═══════════════════════════════════════════════════
const searchToggle = document.getElementById('searchToggle');
const searchBar    = document.getElementById('searchBar');

searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) {
    searchBar.querySelector('input').focus();
  }
});

// ═══════════════════════════════════════════════════
//  SERVICES TABS
// ═══════════════════════════════════════════════════
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) panel.classList.add('active');
  });
});

// ═══════════════════════════════════════════════════
//  COUNTER ANIMATION
// ═══════════════════════════════════════════════════
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// Trigger counters when hero enters viewport
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNumbers.forEach(animateCounter);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

// ═══════════════════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════════════════
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-down, .reveal-zoom, .reveal-flip, .reveal-blur'
);
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, { threshold: 0.10 });
revealEls.forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════════════
//  PARALLAX HERO
// ═══════════════════════════════════════════════════
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (heroImg) {
    heroImg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.18}px)`;
  }
}, { passive: true });

// ═══════════════════════════════════════════════════
//  CONTACT FORM
// ═══════════════════════════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn     = contactForm.querySelector('button[type="submit"]');
    const success = document.getElementById('formSuccess');
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
    setTimeout(() => {
      if (btn) btn.style.display = 'none';
      if (success) success.classList.add('show');
      contactForm.reset();
    }, 1200);
  });
}

// ═══════════════════════════════════════════════════
//  SMOOTH SCROLL FOR ANCHOR LINKS
// ═══════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
