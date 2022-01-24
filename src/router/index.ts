import FormationsVue from "@/views/FormationsView.vue";
import { createWebHistory, createRouter } from "vue-router";
import Home from "~/views/HomeView.vue";
import MatchView from "~/views/MatchView.vue";

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
    path: "/match/:id",
    name: "Match",
    component: MatchView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
