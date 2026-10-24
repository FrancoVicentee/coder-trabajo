# CurrySite 🏀

Tienda online de equipamiento de básquetbol: balones, zapatillas, indumentaria y accesorios.
Sitio multipágina con diseño oscuro deportivo, animaciones y un catálogo dinámico generado con JavaScript.

**Demo:** https://coder-basquet.netlify.app/

## Funcionalidades

- **Catálogo dinámico**: los productos viven en un único archivo de datos ([src/js/data/products.js](src/js/data/products.js)) y se renderizan en la home y en el catálogo.
- **Búsqueda, filtros y orden**: búsqueda sin tildes ni mayúsculas, filtro por categoría con contadores, orden por precio, valoración o nombre.
- **Filtros en la URL**: `productos.html?cat=zapatillas&orden=precio-asc` se puede compartir y sobrevive al recargar. Atajo de teclado `/` para buscar.
- **Detalle de producto** en un modal nativo (`<dialog>`), con link directo (`productos.html#balon-fiba`) y botón que precarga la consulta en el formulario de contacto.
- **Formulario de contacto** con validación en vivo y mensajes en español; al enviarlo abre el cliente de correo con el mensaje armado.
- **Animaciones**: pelota que pica en el hero, revelado al hacer scroll, contadores, cards con inclinación 3D y luz que sigue al cursor, marquesina y menú mobile con transición circular.
- **Accesibilidad**: navegación por teclado, skip link, foco visible, `aria-*` en menú, filtros y formulario, y respeto de `prefers-reduced-motion`.
- **Performance**: imágenes convertidas a WebP (de ~4 MB a ~0,7 MB en total), carga diferida, y JavaScript dividido por página.

## Stack

- [Vite](https://vite.dev/) (build multipágina)
- SCSS modular (`abstracts`, `base`, `layout`, `components`, `pages`) con variables CSS para los colores
- JavaScript moderno (ES modules), sin frameworks
- [sharp](https://sharp.pixelplumbing.com/) para optimizar imágenes
- Deploy en Netlify

## Estructura

```
├── index.html
├── pages/                 productos, nosotros, contacto
├── public/img/            imágenes optimizadas (WebP)
├── images-src/            imágenes originales
├── scripts/               optimize-images.mjs
└── src/
    ├── js/
    │   ├── main.js        inicialización común + carga del script de cada página
    │   ├── data/          catálogo de productos
    │   ├── components/    header, cards, modal, efectos
    │   └── pages/         home, catálogo, contacto
    └── scss/
        ├── main.scss
        ├── abstracts/     breakpoints y mixins
        ├── base/          tokens de color, reset, tipografía
        ├── layout/        header y footer
        ├── components/    botones, cards, modal, formularios
        └── pages/         estilos por página
```

## Desarrollo

```bash
npm install
npm run dev       # servidor local en http://localhost:5173
npm run build     # build de producción en dist/
npm run preview   # sirve el build
npm run images    # regenera public/img desde images-src
```

Para agregar un producto, sumá su imagen a `images-src/`, registrala en `scripts/optimize-images.mjs`, corré `npm run images` y agregá el objeto en `src/js/data/products.js`.

## Autor

Franco Vicente — Tato.vicente08@gmail.com
