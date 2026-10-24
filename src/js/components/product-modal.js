import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { icons } from '../icons.js';
import { CONTACT_EMAIL, formatPrice } from '../utils.js';
import { priceTemplate } from './product-card.js';

let dialog;

// Abre el correo con un mensaje predeterminado consultando por el producto
const inquiryLink = (product) => {
  const subject = `Consulta: ${product.name}`;
  const body = `¡Hola CurrySite! Quería consultar por el producto "${product.name}" (${formatPrice(product.price)}). ¿Tienen stock disponible y cuáles son las opciones de envío?\n\n¡Gracias!`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const render = (product) => `
  <button class="icon-btn modal__close" type="button" data-close aria-label="Cerrar">${icons.close}</button>
  <div class="modal__grid">
    <div class="modal__media">
      <img src="${product.image}" alt="${product.name}" width="400" height="400">
    </div>
    <div class="modal__body">
      <span class="eyebrow">${CATEGORIES[product.category]} · ${product.brand}</span>
      <h2 id="modal-title">${product.name}</h2>
      <p class="rating">${icons.star} ${product.rating.toFixed(1)} / 5</p>
      ${priceTemplate(product)}
      <p class="muted">${product.description}</p>
      <ul class="modal__features">
        ${product.features.map((feature) => `<li>${feature}</li>`).join('')}
      </ul>
      <span class="stock">En stock · Envío a todo el país</span>
      <div class="modal__actions">
        <a class="btn" href="${inquiryLink(product)}">
          ${icons.chat} Consultar por este producto
        </a>
        <button class="btn btn--ghost" type="button" data-close>Seguir viendo</button>
      </div>
    </div>
  </div>`;

const ensureDialog = () => {
  if (dialog) return dialog;

  dialog = document.createElement('dialog');
  dialog.className = 'modal';
  dialog.setAttribute('aria-labelledby', 'modal-title');
  document.body.append(dialog);

  dialog.addEventListener('click', (event) => {
    // Click en el fondo (fuera del contenido) o en un botón de cierre
    if (event.target === dialog || event.target.closest('[data-close]')) dialog.close();
  });

  return dialog;
};

export const openProduct = (id) => {
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) return;

  const modal = ensureDialog();
  modal.innerHTML = render(product);
  modal.showModal();
};

// Delegación: cualquier [data-product] dentro de `root` abre el detalle
export const bindProductModal = (root) => {
  root.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-product]');
    if (trigger) openProduct(trigger.dataset.product);
  });
};
