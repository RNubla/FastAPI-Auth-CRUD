import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Registration from "../views/Auth/Registration";
import Login from "../views/Auth/Login";
import Logout from "../views/Auth/Logout";
import NewPost from "../views/PostEntries/NewPost";
import EditPost from "../views/PostEntries/EditPost";
import Post from "../views/PostEntries/Post";
import store from "../store/index";
import axios from "axios";
// import { from } from "core-js/core/array";
// import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiredAuth: false, title: "Home" },
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: NewPost,
    meta: { requiredAuth: true, title: "New Post" },
  },
  {
    path: "/posts/:id",
    name: "Post",
    meta: { requiredAuth: false },
    component: Post,
  },
  {
    path: "/edit/posts/:id",
    name: "EditPost",
    component: EditPost,
    meta: { requiredAuth: true },
  },
  {
    path: "/register",
    name: "Registration",
    component: Registration,
    meta: { requiredAuth: false, title: "Register" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiredAuth: false, title: "Login" },
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
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    console.log(
      "getItem:access_token",
      sessionStorage.getItem("access_token") == ""
    );
    // if (sessionStorage.getItem("access_token") == null || sessionStorage.getItem("access_token") == "" ) {
    if (
      !store.getters["auth/getLoginStatus"] == null ||
      !store.getters["auth/getLoginStatus"] ||
      !store.getters["auth/getAuthData"].access_token
    ) {
      next({
        name: "Login",
      });
    } else {
      if (!store.getters["auth/getAuthData"].access_token) {
        console.log(
          "!store.getters[auth/getAuthData]",
          !store.getters["auth/getAuthData"].access_token
        );
        const access_token = sessionStorage.getItem("access_token");
        const refresh_token = sessionStorage.getItem("refresh_token");
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
            refresh_token: authData.refresh_token,
          };
          const refreshResponse = await axios
            // .post("http://localhost:8000/auth/refresh", "", {
            .post(`${process.env.VUE_APP_LOCAL_HOST_SERVER}/auth/refresh`, "", {
              headers: {
                Authorization: `Bearer ${payload.refresh_token}`,
              },
            })
            .catch((e) => {
              console.log(e);
            });
          console.log("refreshRespone.data", refreshResponse.data);
          store.commit("auth/SAVE_NEW_ACCESS_TOKEN_DATA", refreshResponse.data);
          auth = true;
        }
      }
      next();
    }
  } else {
    next();
  }
});
