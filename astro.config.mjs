import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), react(), mdx()],
  site: "https://hxann.com",
  vite: {
    ssr: {
      noExternal: ["@fortawesome/*"],
    },
  },
});
