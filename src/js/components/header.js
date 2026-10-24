import { $, $$ } from '../utils.js';

export const initHeader = () => {
  const header = $('.site-header');
  const toggle = $('.menu-toggle');
  const nav = $('#main-nav');
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

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    backToTop.classList.toggle('is-visible', window.scrollY > 700);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
};
