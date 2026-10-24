import { CATEGORIES } from '../data/products.js';
import { icons } from '../icons.js';
import { formatPrice } from '../utils.js';

export const priceTemplate = ({ price, oldPrice }) =>
  `<p class="price">${formatPrice(price)}${oldPrice ? ` <del>${formatPrice(oldPrice)}</del>` : ''}</p>`;

export const productCard = (product, index = 0) => `
  <article class="product-card is-entering" style="--i:${index}">
    <div class="product-card__media">
      ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ''}
      <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async" width="400" height="400">
    </div>
    <div class="product-card__body">
      <p class="product-card__meta">
        <span>${CATEGORIES[product.category]} · ${product.brand}</span>
        <span class="rating">${icons.star}${product.rating.toFixed(1)}</span>
      </p>
      <h3 class="product-card__title">${product.name}</h3>
      <p class="product-card__desc">${product.description}</p>
      <div class="product-card__footer">
        ${priceTemplate(product)}
        <span class="arrow-chip">${icons.arrow}</span>
      </div>
    </div>
    <button class="product-card__open" type="button" data-product="${product.id}">
      <span class="sr-only">Ver detalles de ${product.name}</span>
    </button>
  </article>`;
