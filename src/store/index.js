import { createStore } from "vuex";
import auth from "./modules/auth";
import creatorFinder from "./modules/creator-finder";
import email from "./modules/email";
import user from "./modules/user";


const store = new createStore({
  modules: {
    auth,
    creatorFinder,
    email,
    user
  },
});

export default store;
