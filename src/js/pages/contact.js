import { PRODUCTS } from '../data/products.js';
import { $, $$, CONTACT_EMAIL } from '../utils.js';

const MESSAGES = {
  valueMissing: 'Este campo es obligatorio.',
  typeMismatch: 'Ingresá un email válido (ej: nombre@correo.com).',
  tooShort: (field) => `Escribí al menos ${field.minLength} caracteres.`,
  patternMismatch: 'Usá solo números, espacios, + o guiones.',
};

const errorFor = (field) => {
  const { validity } = field;
  if (validity.valid) return '';
  const key = Object.keys(MESSAGES).find((name) => validity[name]);
  const message = MESSAGES[key] ?? 'Revisá este campo.';
  return typeof message === 'function' ? message(field) : message;
};

const showError = (field) => {
  const error = errorFor(field);
  field.setAttribute('aria-invalid', String(Boolean(error)));
  $(`#${field.id}-error`).textContent = error;
  return !error;
};

export default function initContact() {
  const form = $('#contact-form');
  const status = $('#form-status');
  const fields = $$('.input', form);

  // Si venimos desde el detalle de un producto, precargamos el asunto
  const productId = new URLSearchParams(window.location.search).get('producto');
  const product = PRODUCTS.find((item) => item.id === productId);
  if (product) {
    form.asunto.value = `Consulta: ${product.name}`;
    form.mensaje.value = `Hola! Quería consultar por la disponibilidad de "${product.name}".`;
  }

  fields.forEach((field) => {
    // Validamos al salir del campo y, si ya mostraba error, mientras se corrige
    field.addEventListener('blur', () => field.value && showError(field));
    field.addEventListener('input', () => field.getAttribute('aria-invalid') === 'true' && showError(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !showError(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    // Sin backend: abrimos el cliente de correo con el mensaje armado
    const data = new FormData(form);
    const body = [
      `Nombre: ${data.get('nombre')}`,
      `Email: ${data.get('email')}`,
      data.get('telefono') && `Teléfono: ${data.get('telefono')}`,
      '',
      data.get('mensaje'),
    ]
      .filter((line) => line !== null && line !== '')
      .join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.get('asunto'))}&body=${encodeURIComponent(body)}`;

    status.hidden = false;
    status.textContent = '¡Listo! Abrimos tu app de correo con el mensaje armado. Solo falta tocar "Enviar".';
  });
}
