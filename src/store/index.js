import { createStore } from "vuex";
import auth from "./modules/auth";
import creatorFinder from "./modules/creator-finder";
import user from "./modules/user";


const store = new createStore({
  modules: {
    auth,
    creatorFinder,
    user
  },
});

export default store;
