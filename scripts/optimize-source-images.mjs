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
  { from: "ChatGPT Image 19 sept 2026, 18_37_56 (1).png", to: "hero/01-fachada.jpg", width: 2000 },
  { from: "1.png", to: "hero/02-invernadero.jpg", width: 2000 },
  { from: "1111111.png", to: "hero/03-terraza-atardecer.jpg", width: 2000 },
  { from: "ChatGPT Image 19 sept 2026, 18_36_01 (3).png", to: "hero/04-living.jpg", width: 2000 },

  // Galería (scroll horizontal).
  { from: "ChatGPT Image 19 sept 2026, 18_37_56 (2).png", to: "galeria/01-invernadero-estantes.jpg", width: 1800 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_57 (4).png", to: "galeria/02-interior-tienda.jpg", width: 1800 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_57 (3).png", to: "galeria/03-terraza-sillon.jpg", width: 1800 },

  // Plantas destacadas (pantalla propia, alternadas) — fotos de producto.
  { from: "1111.png", to: "plantas/monstera-deliciosa.jpg", width: 1400 },
  { from: "11111111111111111111111111.png", to: "plantas/ficus-lyrata.jpg", width: 1400 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_58 (10).png", to: "plantas/philodendron-birkin.jpg", width: 1400 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_58 (9).png", to: "plantas/pilea-peperomioides.jpg", width: 1400 },

  // Catálogo (grilla/carrusel) — fotos de producto.
  { from: "1111111111111111111111111111111111111.png", to: "plantas/sansevieria.jpg", width: 1100 },
  { from: "111111111111111111111111111111111111111111111111111.png", to: "plantas/pothos.jpg", width: 1100 },
  { from: "11111111111111111111111111111111111111111111111111111111111111.png", to: "plantas/calathea-orbifolia.jpg", width: 1100 },
  { from: "111111111111111111111111111111111111111111111111111111111111111111111111.png", to: "plantas/zamioculcas.jpg", width: 1100 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_57 (5).png", to: "plantas/aloe-vera.jpg", width: 1100 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_57 (6).png", to: "plantas/espatifilo.jpg", width: 1100 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_57 (7).png", to: "plantas/helecho-boston.jpg", width: 1100 },
  { from: "ChatGPT Image 19 sept 2026, 18_37_57 (8).png", to: "plantas/ficus-elastica.jpg", width: 1100 },
];

const logoJob = { from: "ChatGPT Image 19 sept 2026, 18_36_01 (1).png", width: 600 };

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

  // Logo: mantiene transparencia (PNG), solo se achica.
  const logoSrc = path.join(SRC, logoJob.from);
  const logoDest = path.join(ROOT, "src/assets/logo-nativa.png");
  await mkdir(path.dirname(logoDest), { recursive: true });
  const logoBuf = await sharp(logoSrc).resize({ width: logoJob.width }).png({ quality: 90 }).toBuffer();
  await sharp(logoBuf).toFile(logoDest);
  console.log(`✓ src/assets/logo-nativa.png (${(logoBuf.length / 1024).toFixed(0)} KB)`);
}

run();
