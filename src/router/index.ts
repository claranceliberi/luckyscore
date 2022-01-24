import FormationsVue from "@/views/FormationsView.vue";
import TeamsView from "@/views/TeamsView.vue";
import NewTeamView from "@/views/NewTeamView.vue";

import { createWebHistory, createRouter } from "vue-router";
import Home from "~/views/public/HomeView.vue";
import Fixtures from "~/views/public/home/FixturesView.vue";
import Stats from "~/views/public/home/StatsView.vue";
import Table from "~/views/public/home/TableView.vue";
import Players from "~/views/public/home/PlayersView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { path: "/", name: "Fixtures", component: Fixtures },
      { path: "/table", name: "Table", component: Table },
      { path: "/stats", name: "Stats", component: Stats },
      { path: "/players", name: "Players", component: Players },
    ],
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
  {
    path: "/teams/new",
    name: "Team",
    component: NewTeamView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
