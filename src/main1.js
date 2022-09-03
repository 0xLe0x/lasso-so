import { createApp } from "vue";
import App from "./App.vue";

import base_routes from "./router/base_routes";
import app_routes from "./router/app_routes";

const host = window.location.host;
const parts = host.split(".");
const router = () => {
  let routes;
  console.log(parts[0]);
  if (["local-app", "app"].includes(parts[0])) {
    routes = app_routes;
  } else {
    routes = base_routes;
  }
  return routes;
};

const app = createApp(App);
app.use(router);
app.mount("#app");
