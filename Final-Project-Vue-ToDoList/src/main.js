import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist';
import { Quasar } from 'quasar'; /*info de Quasar */

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

/*la info de quasar que sale en la pagina pregunta si esta bien */
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/dist/quasar.css';

// Assumes your root component is App.vue
// and placed in same folder as main.js
/*import App from './App.vue'*/ /*ya declarado arriba */

/*const myApp = createApp(App);*/


// Assumes you have a <div id="app"></div> in your index.html
/*myApp.mount('#app')*/

/* De aqui para abajo ya estaba instalado---------------------------------------*/
const app = createApp(App);

const pinia = createPinia()

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  });

pinia.use(piniaPersist)

app.use(pinia);
app.use(router);

app.mount("#app");
