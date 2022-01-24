import FormationsVue from "@/views/FormationsView.vue";
import Matches from "@/views/MatchesViews.vue";
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
    path: "/matches",
    name: "Matches",
    component: Matches,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
