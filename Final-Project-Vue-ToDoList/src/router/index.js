import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
/*import HeaderPage from "../views/HomeView.vue";*/


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import('../components/HomePage.vue'),
    },
    {
      path: "/About-Us",
      name: "AboutUs",
      component: () => import('../components/AboutUs.vue'),
    },
    {
      path: "/Collaborators",
      name: "Collaborators",
      component: () => import('../components/Collaborators.vue'),
    },
    {
      path: "/Sign-In",
      name: "SignIn",
      component: () => import('../components/SignInPage.vue'),
    },
    {
      path: "/Sign-Up",
      name: "SignUp",
      component: () => import('../components/SignUpPage.vue')
    },
    {
      path: "/To-Do-List",
      name: "ToDoList",
      component: () => import('../components/ToDoList.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:id',
      name: 'EditTaskList',
      component: () => import('../components/EditTaskInList.vue'),
      params: true,
    },
  ],
})

router.beforeEach((to)=> {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  if (to.meta.requiresAuth && !user.value) return "/";
  
});

export default router;
