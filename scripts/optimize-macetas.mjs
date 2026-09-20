// Script de uso único: redimensiona/comprime las fotos de macetas (recién
// agregadas en la raíz del proyecto) a public/macetas/, y genera además una
// versión blanca del isotipo para usar como marca de agua sobre fondos
// oscuros y en el favicon.
import sharp from "sharp";
import { mkdir, rename } from "node:fs/promises";
import path from "node:path/posix";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public");
const SRC = path.join(ROOT, "sources");

const jobs = [
  { from: "maceta 1.png", to: "macetas/maceta-01-redonda-crema.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_45 (2).png", to: "macetas/maceta-01-redonda-terracota.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_45 (1).png", to: "macetas/maceta-01-redonda-salvia.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_45 (3).png", to: "macetas/maceta-01-redonda-carbon.jpg" },

  { from: "maceta 2.png", to: "macetas/maceta-02-acanalada-terracota.jpg" },

  { from: "maceta 3.png", to: "macetas/maceta-03-conica-crema.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_45 (4).png", to: "macetas/maceta-03-conica-salvia.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_45 (5).png", to: "macetas/maceta-03-conica-terracota.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_46 (6).png", to: "macetas/maceta-03-conica-carbon.jpg" },

  { from: "maceta 4.png", to: "macetas/maceta-04-pedestal-crema.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_46 (7).png", to: "macetas/maceta-04-pedestal-salvia.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_46 (8).png", to: "macetas/maceta-04-pedestal-terracota.jpg" },
  { from: "ChatGPT Image 19 sept 2026, 19_11_46 (9).png", to: "macetas/maceta-04-pedestal-carbon.jpg" },

  { from: "'maceta 5.png", to: "macetas/maceta-05-plato-salvia.jpg" },
];

async function run() {
  await mkdir(path.join(PUB, "macetas"), { recursive: true });

  for (const job of jobs) {
    const from = path.join(ROOT, job.from);
    const dest = path.join(PUB, job.to);
    const buf = await sharp(from).resize({ width: 1100, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    await sharp(buf).toFile(dest);
    console.log(`✓ ${job.to} (${(buf.length / 1024).toFixed(0)} KB)`);
    // Mover el original a sources/ como respaldo, ya optimizado el destino.
    await rename(from, path.join(SRC, job.from.replace(/^'/, "")));
  }

  // ---------- Versión blanca del isotipo ----------
  // El logo original es transparente con hojas verde oscuro + aro bronce.
  // Para usarlo como marca de agua sobre fondos oscuros (y como base del
  // favicon), se aplana todo lo opaco a blanco puro conservando la forma
  // (alpha) via blend "dest-in" sobre un lienzo blanco del mismo tamaño.
  const logoPath = path.join(PUB, "logo-nativa.png");
  const meta = await sharp(logoPath).metadata();
  const whiteCanvas = await sharp({
    create: { width: meta.width, height: meta.height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .png()
    .toBuffer();
  const whiteLogo = await sharp(whiteCanvas)
    .composite([{ input: logoPath, blend: "dest-in" }])
    .png()
    .toBuffer();
  await sharp(whiteLogo).toFile(path.join(PUB, "logo-nativa-white.png"));
  console.log(`✓ logo-nativa-white.png (${(whiteLogo.length / 1024).toFixed(0)} KB)`);
}

run();
