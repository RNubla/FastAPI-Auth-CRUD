import { createStore } from "vuex";
const axios = require("axios");
// const SERVER_URL = "http:localhost:8000";
// const registerModule = {};

export default createStore({
  state: {
    posts: null,
    newUser: {
      user_name: null,
      email: null,
      password: null,
      user_fullname: null,
    },
  },
  getters: {
    getAllPosts: (state) => {
      return state.posts;
    },
  },
  mutations: {
    SET_POSTS_STATE(state, payload) {
      state.posts = payload;
    },
  },
  actions: {
    async registerUser({ state }) {
      await axios
        .post("http://localhost:8000/auth/register", state.newUser, {
          headers: {
            "content-type": "application/json",
          },
        })
        .catch((e) => {
          console.log("vuex: ", e.response.data);
        });
    },
    async fetchPosts({ commit }) {
      await axios
        // .get(`${SERVER_URL}/posts`)
        .get("http://localhost:8000/posts/")
        .then((res) => {
          commit("SET_POSTS_STATE", res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  modules: {},
});
