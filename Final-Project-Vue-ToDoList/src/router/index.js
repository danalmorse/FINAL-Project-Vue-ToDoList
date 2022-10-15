import { createRouter, createWebHistory } from "vue-router";
/*import HeaderPage from "../views/HomeView.vue";*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('../components/HeaderPage.vue'),
    },
    
  ],
});

export default router;
