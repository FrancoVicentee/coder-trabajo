import { $, $$ } from '../utils.js';

export const initHeader = () => {
  const header = $('.site-header');
  const toggle = $('.menu-toggle');
  const nav = $('#main-nav');
  const progress = $('.scroll-progress');
  const backToTop = $('.back-to-top');

  // Marca el link de la página actual
  const current = window.location.pathname.replace(/index\.html$/, '');
  $$('.nav__link').forEach((link) => {
    const path = new URL(link.href).pathname.replace(/index\.html$/, '');
    if (path === current) link.setAttribute('aria-current', 'page');
  });

  // Menú mobile
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Header con fondo al scrollear, se oculta al bajar y reaparece al subir
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle('is-scrolled', y > 20);
    header.classList.toggle('is-hidden', y > lastY && y > 400 && !nav.classList.contains('is-open'));
    progress.style.setProperty('--progress', max > 0 ? y / max : 0);
    backToTop.classList.toggle('is-visible', y > 700);
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
};
