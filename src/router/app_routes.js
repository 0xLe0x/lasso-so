import * as VueRouter from "vue-router";
import HelloApp from "@/components/HelloApp";

export default {
  name: "app_routes",
  router: VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
      {
        path: "/",
        name: "Hello",
        component: HelloApp,
      },
    ],
  }),
};
