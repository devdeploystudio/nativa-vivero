import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// El panel (Sveltia) guarda un campo opcional vacío como "" (string vacío),
// no como ausente — y "" no es una imagen/número válido, así que rompe la
// validación entera del build. Este helper convierte "" a "ausente" ANTES
// de validar, para cualquier campo opcional, así dejar algo en blanco en
// el panel nunca puede tirar abajo el sitio entero.
const sinVacios = <T extends z.ZodType>(schema: T) =>
  z.preprocess((val) => (val === "" ? undefined : val), schema.optional());

const LUZ = ["poca", "media", "mucha"] as const;
const DIFICULTAD = ["facil", "intermedia", "experta"] as const;
const CATEGORIAS_PLANTA = ["interior", "exterior", "colgante", "con-flor", "pet-friendly"] as const;

// ---------- ⚙️ General ----------
const config = defineCollection({
  loader: file("./src/content/config/site.yaml"),
  schema: z.object({
    id: z.string(),
    eslogan: z.string(),
    whatsappNumero: sinVacios(z.string()),
    instagramUrl: sinVacios(z.string()),
  }),
});

// ---------- 🏠 Inicio → Portada ----------
const configInicioHero = defineCollection({
  loader: file("./src/content/config/inicio-hero.yaml"),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    bajada: z.string(),
    ctaPrincipalTexto: z.string(),
    ctaSecundarioTexto: z.string(),
  }),
});

const configInicioFotos = defineCollection({
  loader: file("./src/content/config/inicio-fotos.yaml"),
  schema: z.object({
    id: z.string(),
    slides: z.array(z.object({ imagen: z.string(), alt: z.string() })),
  }),
});

// ---------- 🪴 Plantas destacadas (pantalla propia c/u) ----------
const plantasDestacadas = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/plantas-destacadas" }),
  schema: z.object({
    orden: z.number(),
    nombre: z.string(),
    nombreCientifico: z.string(),
    imagen: z.string(),
    descripcion: z.string(),
    luz: z.enum(LUZ),
    riego: z.enum(["bajo", "moderado", "frecuente"]),
    dificultad: z.enum(DIFICULTAD),
    petFriendly: z.boolean().default(false),
  }),
});

// ---------- 🌱 Catálogo (grilla / carrusel) ----------
const plantasCatalogo = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/plantas-catalogo" }),
  schema: z.object({
    orden: z.number(),
    nombre: z.string(),
    imagen: z.string(),
    luz: z.enum(LUZ),
    dificultad: z.enum(DIFICULTAD),
    categorias: z.array(z.enum(CATEGORIAS_PLANTA)),
  }),
});

// ---------- 🌱 Catálogo → Portada de la página ----------
const configCatalogoPagina = defineCollection({
  loader: file("./src/content/config/catalogo-pagina.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    texto: z.string(),
    imagen: z.string(),
  }),
});

// ---------- 🪴 Catálogo → Plantas (intro de la página) ----------
const configCatalogoPlantas = defineCollection({
  loader: file("./src/content/config/catalogo-plantas.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    texto: z.string(),
  }),
});

// ---------- 🏺 Catálogo → Macetas ----------
const configCatalogoMacetas = defineCollection({
  loader: file("./src/content/config/catalogo-macetas.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    texto: z.string(),
  }),
});

const macetas = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/macetas" }),
  schema: z.object({
    orden: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    colores: z.array(z.object({ nombre: z.string(), imagen: z.string() })),
  }),
});

// ---------- 📍 Contacto (intro de la página) ----------
const configContacto = defineCollection({
  loader: file("./src/content/config/contacto.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    texto: z.string(),
    imagen: z.string(),
  }),
});

// ---------- 🔎 Encontrá tu planta (buscador interactivo) ----------
const configBuscador = defineCollection({
  loader: file("./src/content/config/buscador.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    texto: z.string(),
    ctaTexto: z.string(),
  }),
});

// ---------- 📸 Galería (scroll horizontal) ----------
const configGaleria = defineCollection({
  loader: file("./src/content/config/galeria.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    slides: z.array(z.object({ imagen: z.string(), titulo: z.string() })),
  }),
});

// ---------- 🌤️ Guía de cuidados (acordeón) ----------
const ICONO_CUIDADO = ["luz", "riego", "trasplante", "hojas", "mascotas"] as const;
const configGuiaCuidados = defineCollection({
  loader: file("./src/content/config/guia-cuidados.yaml"),
  schema: z.object({
    id: z.string(),
    kicker: z.string(),
    titulo: z.string(),
    imagen: z.string(),
    items: z.array(z.object({ icono: z.enum(ICONO_CUIDADO), pregunta: z.string(), respuesta: z.string() })),
  }),
});

// ---------- 💬 Testimonios ----------
const testimonios = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/testimonios" }),
  schema: z.object({
    orden: z.number(),
    nombre: z.string(),
    rol: z.string(),
    texto: z.string(),
  }),
});

// ---------- 🔢 Números ----------
const configNumeros = defineCollection({
  loader: file("./src/content/config/numeros.yaml"),
  schema: z.object({
    id: z.string(),
    items: z.array(z.object({ numero: z.number(), sufijo: z.string(), etiqueta: z.string() })),
  }),
});

// ---------- 🪴 Cómo funciona (pasos) ----------
const configComoFunciona = defineCollection({
  loader: file("./src/content/config/como-funciona.yaml"),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    texto: z.string(),
    pasos: z.array(z.object({ titulo: z.string(), texto: z.string() })),
  }),
});

// ---------- 📍 Ubicación ----------
const configUbicacion = defineCollection({
  loader: file("./src/content/config/ubicacion.yaml"),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    direccion: z.string(),
    horario: z.string(),
    mapaEmbedUrl: z.string(),
  }),
});

// ---------- 🌿 Bloque final (CTA) ----------
const configCtaFinal = defineCollection({
  loader: file("./src/content/config/cta-final.yaml"),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    texto: z.string(),
    imagen: z.string(),
  }),
});

export const collections = {
  config,
  configInicioHero,
  configInicioFotos,
  plantasDestacadas,
  configCatalogoPagina,
  configCatalogoPlantas,
  plantasCatalogo,
  configCatalogoMacetas,
  macetas,
  configBuscador,
  configGaleria,
  configGuiaCuidados,
  testimonios,
  configNumeros,
  configComoFunciona,
  configContacto,
  configUbicacion,
  configCtaFinal,
};
