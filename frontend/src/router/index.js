import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Registration from "../views/Registration";
import Login from "../views/Login";
import Logout from "../views/Logout";
import NewPost from "../views/NewPost";
import store from "../store/index";
// import axios from "axios";

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
  {
    path: "/logout",
    name: "Logout",
    meta: { requiredAuth: false },
    component: Logout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
});
export default router;
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    // if (localStorage.getItem("access_token") == null) {
    if (!store.getters["auth/getAuthData"].access_token) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
/* router.beforeEach(async (to, from, next) => {
  console.log(
    "getAuthData is undefined:",
    !store.getters["auth/getAuthData"].access_token
  );
  if (!store.getters["auth/getAuthData"].access_token) {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    if (access_token) {
      const data = {
        access_token: access_token,
        refresh_token: refresh_token,
      };
      console.log("data", data);
      store.commit("auth/SAVE_TOKEN_DATA", data);
    }
  }
  let auth = store.getters["auth/isTokenActive"];
  if (!auth) {
    const authData = store.getters["auth/getAuthData"];
    if (authData.access_token) {
      const payload = {
        // access_token: authData.access_token,
        refresh_token: authData.refresh_token,
      };
      // console.log("paylaod", payload);
      const refreshResponse = await axios
        .post("http://localhost:8000/auth/refresh", "", {
          headers: {
            Authorization: `Bearer ${payload.refresh_token}`,
          },
        })
        .catch((e) => {
          console.log(e);
        });
      // console.log(refreshResponse.data);
      store.commit("auth/SAVE_TOKEN_DATA", refreshResponse.data);
      auth = true;
    }
  }
  if (to.fullPath == "/") {
    return next();
  } else if (auth && !to.meta.requiredAuth) {
    return next({ name: "NewPost" });
  } else if (!auth && to.meta.requiredAuth) {
    return next({ name: "Login" });
  }

  return next();
});
 */
