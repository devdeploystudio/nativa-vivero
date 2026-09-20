// Script de uso único: genera el set de favicons/OG a partir de los
// assets ya optimizados (logo + foto de portada).
import sharp from "sharp";
import path from "node:path/posix";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public");
const LOGO_WHITE = path.join(PUB, "logo-nativa-white.png");
const HERO = path.join(PUB, "hero/01-fachada.jpg");
const BRAND_CLAY = "#bd7b4f";

async function run() {
  // El logo (isotipo + wordmark) tiene bastante margen transparente propio
  // alrededor del dibujo — sin recortarlo primero, a tamaño de favicon ese
  // margen se ve como un borde/aro blanco raro. Se recorta ajustado antes
  // de componer, y se usa la versión blanca sobre un fondo sólido color
  // marca (nunca transparente ni crema: un favicon necesita contraste
  // parejo sobre cualquier fondo de navegador, claro u oscuro).
  const trimmedLogo = await sharp(LOGO_WHITE).trim().toBuffer();

  for (const size of [16, 32, 192, 512]) {
    const mark = Math.round(size * 0.62);
    const markBuf = await sharp(trimmedLogo).resize({ width: mark, height: mark, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: BRAND_CLAY } })
      .composite([{ input: markBuf, gravity: "center" }])
      .png()
      .toFile(path.join(PUB, size <= 32 ? `favicon-${size}.png` : `icon-${size}.png`));
  }

  const appleMark = await sharp(trimmedLogo).resize({ width: 116, height: 116, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: BRAND_CLAY } })
    .composite([{ input: appleMark, gravity: "center" }])
    .png()
    .toFile(path.join(PUB, "apple-touch-icon.png"));

  // OG image (1200x630) a partir de la foto de fachada.
  await sharp(HERO).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 85 }).toFile(path.join(PUB, "seo/og-image.jpg"));

  console.log("✓ favicons, apple-touch-icon e og-image generados");
}

run();
