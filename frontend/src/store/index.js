import { createStore } from "vuex";
import authModule from "./modules/auth";
import postModule from "./modules/posts";
import registerModule from "./modules/register";

const store = createStore({
  modules: {
    auth: authModule,
    posts: postModule,
    register: registerModule,
  },
});

export default store;
