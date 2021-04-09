import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Registration from "./views/Registration";
import Login from "./views/Login";
import NewPost from "./views/NewPost";
import store from "./store/index";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiredAuth: false },
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: NewPost,
    meta: { requiredAuth: true },
  },
  {
    path: "/register",
    name: "Registration",
    component: Registration,
    meta: { requiredAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiredAuth: false },
  },
];

export const routerConfig = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

routerConfig.beforeEach(async (to, from, next) => {
  console.log("getAuthData:", store.getters["auth/getAuthData"]);
  if (!store.getters["auth/getAuthData"].access_token) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token) {
      const data = {
        access_token: access_token,
        refresh_token: refresh_token,
      };
      store.commit("SAVE_TOKEN_DATA", data);
    }
  }
  let auth = store.getters["auth/isTokenActive"];

  // console.log(!auth);
  if (!auth) {
    const authData = store.getters["auth/getAuthData"];
    if (authData) {
      const payload = {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
      };
      const refreshResponse = await axios.post(
        "http://localhost:8000/auth/refresh",
        payload
      );
      store.commit("auth/SAVE_TOKEN_DATA", refreshResponse.data.data);
      auth = true;
    }
  }
  if (to.fullPath == "/") {
    return next();
  } else if (auth && !to.meta.requiredAuth) {
    return next({ path: "/dashboard" });
  } else if (!auth && to.meta.requiredAuth) {
    return next({ path: "/login" });
  }

  return next();
});
