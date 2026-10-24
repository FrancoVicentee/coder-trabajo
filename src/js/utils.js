export const CONTACT_EMAIL = 'Tato.vicente08@gmail.com';

export const $ =(selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export const formatPrice = (value) => priceFormatter.format(value);

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Normaliza texto para búsquedas: minúsculas y sin tildes ("Balón" coincide con "balon")
export const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const debounce = (fn, wait = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

// Rutas relativas a la raíz del sitio, válidas desde cualquier página
export const url = (path) => new URL(path, window.location.origin).pathname;
