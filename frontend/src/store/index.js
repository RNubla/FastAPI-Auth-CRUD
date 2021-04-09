import { createStore } from "vuex";
import authModule from "./modules/auth";
import postModule from "./modules/posts";
import registerModule from "./modules/register";
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  modules: {
    auth: authModule,
    posts: postModule,
    register: registerModule,
  },
  // plugins:[authDataState]
  plugins:[createPersistedState()]
});

export default store;
