import { createStore } from "vuex";
import authModule from "./modules/auth";
import postModule from "./modules/posts";
import registerModule from "./modules/register";
import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
  paths: ["auth.authData", "auth.loginStatus", "posts.singlePost"],
});

const store = createStore({
  modules: {
    auth: authModule,
    posts: postModule,
    register: registerModule,
  },
  plugins: [dataState],
});

export default store;
