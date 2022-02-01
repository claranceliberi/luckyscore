import Auth from "@/views/auth/AuthView.vue";
import SignUp from "@/views/auth/SignupView.vue";
import AddEventsView from "@/views/dashboard/AddEventsView.vue";
import AddPlayerView from "@/views/dashboard/AddPlayerView.vue";
import TeamDetailsView from "@/views/dashboard/TeamDetailsView.vue";
import NewTeamView from "@/views/NewTeamView.vue";
import NotFound from "@/views/NotFoundView.vue";
import { createRouter, createWebHistory } from "vue-router";
import SignIn from "~/views/auth/SigninView.vue";
import IndexDashboard from "~/views/dashboard/IndexView.vue";
import MatchesView from "~/views/dashboard/MatchesView.vue";
import NewMatch from "~/views/dashboard/NewMatch.vue";
import MatchDetailsView from "~/views/dashboard/MatchDetailsView.vue";
import FormationsView from "@/views/dashboard/AddFormationsView.vue";
import AdminMatchFixturesView from "~/views/dashboard/AdminMatchFixturesView.vue";
import DashboardTeams from "~/views/dashboard/TeamsView.vue";
import Dashboard from "~/views/DashboardView.vue";
import Fixtures from "~/views/public/home/FixturesView.vue";
import MatchView from "~/views/public/home/MatchView.vue";
import Players from "~/views/public/home/PlayersView.vue";
import Stats from "~/views/public/home/StatsView.vue";
import Table from "~/views/public/home/TableView.vue";
import Home from "~/views/public/HomeView.vue";

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
        component: AdminMatchFixturesView,
      },
      {
        path: "/dashboard/matches/new",
        name: "NewDashboardMatch",
        component: NewMatch,
      },
      {
        path: "/dashboard/matches/:matchId/formation",
        name: "MatchFormations",
        component: FormationsView,
      },
      {
        path: "/dashboard/teams/new",
        name: "newTeam",
        component: NewTeamView,
      },
      {
        path: "/dashboard/teams/:id/view",
        name: "viewTeam",
        component: TeamDetailsView,
        props: true,
      },
      {
        path: "/dashboard/teams/:teamId/add-player",
        name: "addPlayer",
        component: AddPlayerView,
      },
      {
        path: "/dashboard/live/:matchId/add-events",
        name: "addEvents",
        component: AddEventsView,
      },
    ],
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
      { path: "/matches", name: "Matches", component: MatchesView },
      { path: "/match/:id", name: "Match", component: MatchView },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    children: [
      { path: "/signin", name: "SignIn", component: SignIn },
      { path: "/signup", name: "SignUp", component: SignUp },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
