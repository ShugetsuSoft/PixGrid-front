import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Landing",
      component: () => import("./views/Landing.vue"),
    },
    {
      path: "/detail/:hash",
      name: "Details",
      component: () => import("./views/Details.vue"),
    },
  ],
});

export default router;
