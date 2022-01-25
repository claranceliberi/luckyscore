import FormationsVue from "@/views/FormationsView.vue";
import { createWebHistory, createRouter } from "vue-router";
import Home from "~/views/public/HomeView.vue";
import MatchView from "~/views/public/home/MatchView.vue";
import Stats from "~/views/public/home/StatsView.vue";
import Table from "~/views/public/home/TableView.vue";
import Players from "~/views/public/home/PlayersView.vue";
import Fixtures from "~/views/public/home/FixturesView.vue";

import Dashboard from "~/views/DashboardView.vue";
import IndexDashboard from "~/views/dashboard/IndexView.vue";
import DashboardTeams from "~/views/dashboard/TeamsView.vue";
import DashboardMatch from "~/views/dashboard/MatchesView.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      { path: "/dashboard/", name: "Dashboard", component: IndexDashboard },
      {
        path: "/dashboard/teams",
        name: "DashboardTeams",
        component: DashboardTeams,
      },
      {
        path: "/dashboard/matches",
        name: "DashboardMatches",
        component: DashboardMatch,
      },
    ],
  },
  {
    path: "/formations",
    name: "About",
    component: FormationsVue,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      { path: "/", name: "Fixtures", component: Fixtures },
      { path: "/table", name: "Table", component: Table },
      { path: "/stats", name: "Stats", component: Stats },
      { path: "/players", name: "Players", component: Players },
      { path: "/match/:id", name: "Match", component: MatchView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
