import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persist';


import App from "./App.vue";
import router from "./router";
import "bootstrap" 
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/main.css";


// Assumes your root component is App.vue
// and placed in same folder as main.js
/*import App from './App.vue'*/ /*ya declarado arriba */

/*const myApp = createApp(App);*/


// Assumes you have a <div id="app"></div> in your index.html
/*myApp.mount('#app')*/

/* De aqui para abajo ya estaba instalado---------------------------------------*/
const app = createApp(App);

const pinia = createPinia()

pinia.use(piniaPersist)

app.use(pinia);
app.use(router);

app.mount("#app");
