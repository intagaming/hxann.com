import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), react()],
  site: "https://hxann.com",
  vite: {
    ssr: {
      noExternal: ["@fortawesome/*"],
    },
  },
});
