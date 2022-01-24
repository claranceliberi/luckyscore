import FormationsVue from "@/views/FormationsView.vue";
import TeamsView from "@/views/TeamsView.vue";

import { createWebHistory, createRouter } from "vue-router";
import Home from "~/views/HomeView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/formations",
    name: "About",
    component: FormationsVue,
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
