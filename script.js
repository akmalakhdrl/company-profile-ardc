// ARDC Company Profile - script.js
// Handles: loader, smooth scroll, navbar on scroll, reveal animations, counters, simple parallax

document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.style.display = 'none'; }, 700);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Navbar change on scroll
  const header = document.getElementById('site-header');
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');

    // parallax simple
    if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    document.querySelector('.nav ul').classList.toggle('open');
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-active');
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.num');
  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.dataset.target || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 120));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { counter.innerText = target; clearInterval(timer); }
        else counter.innerText = current;
      }, 12);
    });
  };
  // start counters when stats visible
  const statsEl = document.getElementById('stats');
  if (statsEl) {
    const stObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { startCounters(); obs.disconnect(); } });
    }, {threshold:0.35});
    stObs.observe(statsEl);
  }

  // Contact form (placeholder)
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim.');
    contactForm.reset();
  });

  // WhatsApp CTA
  const wa = document.getElementById('whatsapp-cta');
  const waQuick = document.getElementById('whatsapp-quick');
  const phone = '6281234567890';
  const waUrl = (text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  wa && wa.addEventListener('click', (e) => { e.preventDefault(); window.open(waUrl('Halo ARDC, saya tertarik...'), '_blank'); });
  waQuick && waQuick.addEventListener('click', (e) => { e.preventDefault(); window.open(waUrl('Halo ARDC, saya ingin konsultasi...'), '_blank'); });

});
