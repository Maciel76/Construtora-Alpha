import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // Remova a rota /about se não for usada
];

const router = createRouter({
  history: createWebHistory(), // Mude para createWebHistory
  routes,
});

export default router;
