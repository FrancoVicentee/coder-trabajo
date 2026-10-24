import { $$, prefersReducedMotion } from '../utils.js';

// Revela elementos .reveal al entrar en pantalla
export const initReveal = () => {
  const items = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  items.forEach((el) => observer.observe(el));
};

// Contadores animados: <span data-count="5000">0</span>
export const initCounters = () => {
  const counters = $$('[data-count]');
  const run = (el) => {
    const target = Number(el.dataset.count);
    if (prefersReducedMotion()) {
      el.textContent = target.toLocaleString('es-AR');
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(target * eased).toLocaleString('es-AR');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      observer.unobserve(entry.target);
    });
  });
  counters.forEach((el) => observer.observe(el));
};
