// Convierte las imágenes originales (images-src/) a WebP optimizado en public/img/.
// Uso: npm run images
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'images-src';
const OUT = 'public/img';

// [archivo original, nombre de salida, ancho máximo]
const IMAGES = [
  ['fondo.jpg', 'hero-arena', 1600],
  ['Vicente11.jpg', 'cancha-indoor', 1400],
  ['Vicente12.jpg', 'accion-nba', 800],
  ['Vicente13.jpeg', 'combo-entrenamiento', 600],
  ['balon.jpg', 'balon-spalding-indoor', 700],
  ['Vicente3.jpg', 'balon-wilson-outdoor', 700],
  ['Vicente2.jpg', 'mini-balon-jordan', 700],
  ['Vicente1.jpeg', 'balon-fiba', 700],
  ['zapatillas.jpg', 'zapatillas-elite-pro', 700],
  ['Vicente6.jpg', 'nike-air-zoom', 700],
  ['Vicente15.jpeg', 'adidas-harden', 700],
  ['Vicente5.jpg', 'under-armour-jet', 700],
  ['Vicente4.jpg', 'curry-flow', 700],
  ['Vicente14.jpeg', 'camiseta-jordan-23', 700],
  ['Vicente7.jpg', 'aro-portatil', 700],
  ['Vicente8.jpg', 'red-acero', 700],
  ['Vicente9.jpg', 'manga-compresion', 700],
  ['Vicente10.jpg', 'tobillera-elastica', 700],
  ['Vicente16.jpg', 'medias-compresion', 700],
  ['Vicente17.jpg', 'tobillera-ajustable', 700],
];

await mkdir(OUT, { recursive: true });

for (const [file, name, width] of IMAGES) {
  const info = await sharp(path.join(SRC, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: name === 'hero-arena' ? 62 : 78 })
    .toFile(path.join(OUT, `${name}.webp`));
  console.log(`${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
