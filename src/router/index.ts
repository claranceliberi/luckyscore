import FormationsVue from "@/views/FormationsView.vue";
import { createWebHistory, createRouter } from "vue-router";
import Home from "~/views/public/HomeView.vue";
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
