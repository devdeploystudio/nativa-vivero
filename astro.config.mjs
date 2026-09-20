// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://nativavivero.example.com",
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
