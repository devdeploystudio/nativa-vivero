import { getEntry } from "astro:content";

// El sitio se publica como "project page" de GitHub Pages
// (devdeploystudio.github.io/nativa-vivero/, no en la raíz del dominio),
// así que Astro corre con `base: "/nativa-vivero"` (ver astro.config.mjs).
// Los archivos de public/ (imágenes, logo, etc.) NO pasan por el pipeline
// de assets de Astro — un string a mano como "/hero/01-fachada.jpg" no se
// prefija solo. Cualquier ruta absoluta (imagen, link interno) tiene que
// pasar por este helper antes de ir a un `src`/`href`, si no rompe en
// producción aunque funcione perfecto en local (ahí BASE_URL es "/").
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

const configEntry = await getEntry("config", "site");
export const WHATSAPP_NUMBER = configEntry!.data.whatsappNumero || "5491100000000";
export const INSTAGRAM_URL = configEntry!.data.instagramUrl || "https://www.instagram.com/nativavivero/";
export const ESLOGAN = configEntry!.data.eslogan;

export const SITE = {
  nombre: "Nativa Vivero",
  descripcion:
    "Vivero familiar en Escobar, Buenos Aires. Plantas de interior y exterior, asesoramiento personalizado y maceta de cerámica incluida.",
};

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/#destacadas", label: "Destacadas" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#cuidados", label: "Cuidados" },
  { href: "/contacto", label: "Contacto" },
];
