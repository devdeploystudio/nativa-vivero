import { getEntry } from "astro:content";

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
