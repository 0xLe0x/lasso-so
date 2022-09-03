import * as VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";

export default {
  name: "base_routes",
  router: VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
      {
        path: "/",
        name: "Hello",
        component: HelloWorld,
      },
    ],
  }),
};
