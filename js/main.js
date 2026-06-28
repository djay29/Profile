'use strict';

document.documentElement.classList.add('js-ready');

const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

// Nav border on scroll
function handleNavScroll() {
  nav.classList.toggle('is-scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// Active nav link tracking
function updateActiveLink() {
  let current = '';
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Scroll reveal — IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// Stagger grid children
document.querySelectorAll('.also-built__grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((child, i) => {
    child.style.transitionDelay = `${i * 75}ms`;
  });
});

document.querySelectorAll('.skills__grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((child, i) => {
    child.style.transitionDelay = `${i * 55}ms`;
  });
});

// Smooth scroll offset correction for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64) - 24;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});
