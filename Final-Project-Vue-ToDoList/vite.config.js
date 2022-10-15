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
  /*plugins: [vue()],*/ /*Aqui en plugins he copiado lo de arriba de quasar y lo he bajado aquí en caso de utilizar bootstrap tengo que eliminar quasar */
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
