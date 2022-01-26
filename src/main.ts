import { createApp } from "vue";
import App from "./App.vue";
import "~/assets/styles/index.css";
import "~/assets/styles/index.scss";
import router from "./router";

import Toast, { PluginOptions, useToast } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // You can set your default options here
};

const app = createApp(App);
app.use(Toast, options);
app.use(router).mount("#app");
