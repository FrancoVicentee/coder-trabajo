import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { productCard } from '../components/product-card.js';
import { bindProductModal, openProduct } from '../components/product-modal.js';
import { $, debounce, normalize } from '../utils.js';

const SORTERS = {
  relevancia: (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.rating - a.rating,
  'precio-asc': (a, b) => a.price - b.price,
  'precio-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  nombre: (a, b) => a.name.localeCompare(b.name, 'es'),
};

const matchesQuery = (product, query) =>
  !query || normalize(`${product.name} ${product.brand} ${product.description} ${CATEGORIES[product.category]}`).includes(query);

export default function initCatalog() {
  const grid = $('#catalog-grid');
  const chips = $('#category-chips');
  const search = $('#catalog-search');
  const sort = $('#catalog-sort');
  const count = $('#results-count');
  const reset = $('#reset-filters');
  const empty = $('#empty-state');

  // El estado vive en la URL: los filtros se pueden compartir y sobreviven al recargar
  const params = new URLSearchParams(window.location.search);
  const state = {
    cat: params.get('cat') in CATEGORIES ? params.get('cat') : 'todos',
    q: params.get('q') ?? '',
    sort: params.get('orden') in SORTERS ? params.get('orden') : 'relevancia',
  };

  search.value = state.q;
  sort.value = state.sort;

  const syncUrl = () => {
    const next = new URLSearchParams();
    if (state.cat !== 'todos') next.set('cat', state.cat);
    if (state.q) next.set('q', state.q);
    if (state.sort !== 'relevancia') next.set('orden', state.sort);
    const query = next.toString();
    history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  };

  const renderChips = (byQuery) => {
    const entries = [['todos', 'Todos'], ...Object.entries(CATEGORIES)];
    chips.innerHTML = entries
      .map(([key, label]) => {
        const total = key === 'todos' ? byQuery.length : byQuery.filter((p) => p.category === key).length;
        return `<button class="chip" type="button" data-cat="${key}" aria-pressed="${state.cat === key}">
          ${label} <small>${total}</small>
        </button>`;
      })
      .join('');
  };

  const render = () => {
    const query = normalize(state.q.trim());
    const byQuery = PRODUCTS.filter((product) => matchesQuery(product, query));
    const results = byQuery
      .filter((product) => state.cat === 'todos' || product.category === state.cat)
      .sort(SORTERS[state.sort]);

    renderChips(byQuery);
    grid.innerHTML = results.map((product, index) => productCard(product, index)).join('');
    empty.hidden = results.length > 0;
    count.innerHTML = `<strong>${results.length}</strong> ${results.length === 1 ? 'producto' : 'productos'}`;
    reset.hidden = state.cat === 'todos' && !state.q && state.sort === 'relevancia';
    syncUrl();
  };

  chips.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-cat]');
    if (!chip) return;
    state.cat = chip.dataset.cat;
    render();
  });

  search.addEventListener(
    'input',
    debounce(() => {
      state.q = search.value;
      render();
    }, 180),
  );

  sort.addEventListener('change', () => {
    state.sort = sort.value;
    render();
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-reset]')) return;
    Object.assign(state, { cat: 'todos', q: '', sort: 'relevancia' });
    search.value = '';
    sort.value = 'relevancia';
    render();
    search.focus();
  });

  // Atajo: "/" enfoca el buscador
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !event.target.closest('input, textarea, select, dialog')) {
      event.preventDefault();
      search.focus();
    }
  });

  // Link directo a un producto: productos.html#balon-fiba (se lee antes de que render() reescriba la URL)
  const hash = decodeURIComponent(window.location.hash.slice(1));

  bindProductModal(grid);
  render();

  if (hash) openProduct(hash);
}
