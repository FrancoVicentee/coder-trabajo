import '../scss/main.scss';
import { initHeader } from './components/header.js';
import { initCounters, initReveal } from './components/effects.js';

// Cada página declara <body data-page="..."> y solo se descarga su propio código
const PAGES = {
  home: () => import('./pages/home.js'),
  catalog: () => import('./pages/catalog.js'),
  contact: () => import('./pages/contact.js'),
};

initHeader();

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

const loadPage = PAGES[document.body.dataset.page]?.() ?? Promise.resolve();

loadPage
  .then((module) => module?.default())
  .finally(() => {
    initReveal();
    initCounters();
  });
