import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const page = (file) => resolve(import.meta.dirname, file);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: page('index.html'),
        productos: page('pages/productos.html'),
        nosotros: page('pages/nosotros.html'),
        contacto: page('pages/contacto.html'),
      },
    },
  },
});
