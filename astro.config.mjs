// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Se publica como project page de GitHub Pages: la URL real queda con
  // el nombre del repo al final (devdeploystudio.github.io/nativa-vivero),
  // no en la raíz del dominio — por eso hace falta `base` acá (ver el
  // helper withBase() en src/config/site.ts, que lo aplica a cualquier
  // ruta absoluta a mano: imágenes de public/, links internos).
  site: "https://devdeploystudio.github.io",
  base: "/nativa-vivero",
  integrations: [
    sitemap({
      // /editor es la sección interna de edición, no contenido para buscar
      // en Google: no tiene sentido que aparezca en el sitemap.
      filter: (page) => !page.includes("/editor"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
