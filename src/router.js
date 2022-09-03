import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard.vue";
import PageNotFound from "./pages/utility/PageNotFound.vue";
import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import ResetPassword from "./pages/ResetPassword.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Dashboard,
    },
    {
      path: "/signin",
      component: Signin,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/reset-password",
      component: ResetPassword,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

export default router;
