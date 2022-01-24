import { createApp } from "vue";
import App from "./App.vue";
import "~/assets/styles/index.css";
import "~/assets/styles/index.scss";
import router from "./router";

createApp(App).use(router).mount("#app");
