// Script de uso único: redimensiona y comprime las imágenes originales
// (fotos generadas, pesadas, en sources/) a los archivos finales que sirve
// el sitio en public/. No es parte del bot de renombrado/versionado de
// Deploy (ese aplica a subidas del panel en producción) — esto es solo la
// puesta a punto inicial de los assets de este ejemplo.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path/posix";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "sources");
const PUB = path.join(ROOT, "public");

const jobs = [
  // Hero (portada) — imágenes anchas, atmosféricas.
  { from: "hero-01-fachada.png", to: "hero/01-fachada.jpg", width: 2000 },
  { from: "hero-02-invernadero.png", to: "hero/02-invernadero.jpg", width: 2000 },
  { from: "hero-03-terraza-atardecer.png", to: "hero/03-terraza-atardecer.jpg", width: 2000 },
  { from: "hero-04-living.png", to: "hero/04-living.jpg", width: 2000 },

  // Galería (scroll horizontal).
  { from: "galeria-01-invernadero-estantes.png", to: "galeria/01-invernadero-estantes.jpg", width: 1800 },
  { from: "galeria-02-interior-tienda.png", to: "galeria/02-interior-tienda.jpg", width: 1800 },
  { from: "galeria-03-terraza-sillon.png", to: "galeria/03-terraza-sillon.jpg", width: 1800 },

  // Plantas destacadas (pantalla propia, alternadas) — fotos de producto.
  { from: "planta-monstera-deliciosa.png", to: "plantas/monstera-deliciosa.jpg", width: 1400 },
  { from: "planta-ficus-lyrata.png", to: "plantas/ficus-lyrata.jpg", width: 1400 },
  { from: "planta-philodendron-birkin.png", to: "plantas/philodendron-birkin.jpg", width: 1400 },
  { from: "planta-pilea-peperomioides.png", to: "plantas/pilea-peperomioides.jpg", width: 1400 },

  // Catálogo (grilla/carrusel) — fotos de producto.
  { from: "planta-sansevieria.png", to: "plantas/sansevieria.jpg", width: 1100 },
  { from: "planta-pothos.png", to: "plantas/pothos.jpg", width: 1100 },
  { from: "planta-calathea-orbifolia.png", to: "plantas/calathea-orbifolia.jpg", width: 1100 },
  { from: "planta-zamioculcas.png", to: "plantas/zamioculcas.jpg", width: 1100 },
  { from: "planta-aloe-vera.png", to: "plantas/aloe-vera.jpg", width: 1100 },
  { from: "planta-espatifilo.png", to: "plantas/espatifilo.jpg", width: 1100 },
  { from: "planta-helecho-boston.png", to: "plantas/helecho-boston.jpg", width: 1100 },
  { from: "planta-ficus-elastica.png", to: "plantas/ficus-elastica.jpg", width: 1100 },
];

const logoJob = { from: "logo-nativa-original.png", width: 600 };

async function run() {
  for (const job of jobs) {
    const src = path.join(SRC, job.from);
    const dest = path.join(PUB, job.to);
    await mkdir(path.dirname(dest), { recursive: true });
    const buf = await sharp(src)
      .resize({ width: job.width, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await sharp(buf).toFile(dest);
    console.log(`✓ ${job.to} (${(buf.length / 1024).toFixed(0)} KB)`);
  }

  // Logo: mantiene transparencia (PNG), solo se achica. Vive en public/ (no
  // src/assets/) para poder referenciarlo con una ruta simple <img src="/...">
  // sin pasar por astro:assets.
  const logoSrc = path.join(SRC, logoJob.from);
  const logoDest = path.join(PUB, "logo-nativa.png");
  const logoBuf = await sharp(logoSrc).resize({ width: logoJob.width }).png({ quality: 90 }).toBuffer();
  await sharp(logoBuf).toFile(logoDest);
  console.log(`✓ public/logo-nativa.png (${(logoBuf.length / 1024).toFixed(0)} KB)`);
}

run();
