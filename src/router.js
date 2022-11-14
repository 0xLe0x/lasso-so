import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import Activate from "./pages/Activate.vue";
import Search from "./pages/Search.vue";
import Home from "./pages/Home.vue";
import Qualify from "./pages/Qualify.vue";
import Email from "./pages/Email.vue";
import PageNotFound from "./pages/utility/PageNotFound.vue";
import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import RequestResetPassword from "./pages/RequestResetPassword.vue";

const routerHistory = createWebHistory();

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/signin')
}

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/search",
      component: Search,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/qualify",
      component: Qualify,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/email",
      component: Email,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/activate/:verification_token",
      component: Activate,
    },
    {
      path: "/signin",
      component: Signin,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/signup",
      component: Signup,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/reset-password/:reset_token",
      component: ResetPassword,
    },
    {
      path: "/reset-password",
      component: RequestResetPassword,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
      beforeEnter: ifAuthenticated,
    },
  ],
});

export default router;
