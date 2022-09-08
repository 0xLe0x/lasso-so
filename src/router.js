import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import Dashboard from "./pages/Dashboard.vue";
import PageNotFound from "./pages/utility/PageNotFound.vue";
import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import ResetPassword from "./pages/ResetPassword.vue";

const routerHistory = createWebHistory();

const ifNotAuthenticated = (to, from, next) => {
  console.log("Authenticated: ", store.getters.isAuthenticated)
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  console.log("Authenticated: ", store.getters.isAuthenticated)
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
      component: Dashboard,
      beforeEnter: ifAuthenticated,
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
      path: "/reset-password",
      component: ResetPassword,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

export default router;
