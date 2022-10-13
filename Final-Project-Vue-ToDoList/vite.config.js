import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
/*quasar info de la pagina de quasar */
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  /*quasar de la pagina de quasar preguntar si esta bien
  
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar()
    ],
    
  /*como esto se instalo */
  /*plugins: [vue()],*/
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar()
    ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
