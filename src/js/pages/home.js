import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { productCard } from '../components/product-card.js';
import { bindProductModal } from '../components/product-modal.js';
import { $, $$, prefersReducedMotion } from '../utils.js';

export default function initHome() {
  const grid = $('#featured-grid');
  grid.innerHTML = PRODUCTS.filter((product) => product.featured)
    .map((product, index) => productCard(product, index))
    .join('');
  bindProductModal(grid);

  // Cantidad de productos en cada tile de categoría
  $$('[data-category-count]').forEach((el) => {
    const total = PRODUCTS.filter((product) => product.category === el.dataset.categoryCount).length;
    el.textContent = `${total} productos`;
  });
  $$('[data-category-name]').forEach((el) => {
    el.textContent = CATEGORIES[el.dataset.categoryName];
  });

  // Parallax suave de la foto del hero
  const hero = $('.hero');
  if (hero && !prefersReducedMotion()) {
    window.addEventListener(
      'scroll',
      () => {
        const y = Math.min(window.scrollY, window.innerHeight);
        hero.style.setProperty('--parallax', `${y * 0.25}px`);
      },
      { passive: true },
    );
  }
}
