import { createStore } from "vuex";
const axios = require("axios");
// const SERVER_URL = "http:localhost:8000";

export default createStore({
  state: {
    posts: null,
    newUser: {
      user_name: null,
      email: null,
      password: null,
      fullname: null,
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
    REGISTER_USER(state, payload) {
      state.newUser.user_name = payload.user_name;
      state.newUser.email = payload.email;
      state.newUser.fullname = payload.user_fullname;
      state.newUser.password = payload.password;
    },
  },
  actions: {
    // async registerUser({ commit }, payload_data) {
    async registerUser(payload_data) {
      // await axios(`${SERVER_URL}/auth/register`, payload_data)
      await axios("http://localhost:8000/auth/register", payload_data)
        .then((res) => {
          // commit("REGISTER_USER", res.data.data);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async fetchPosts({ commit }) {
      await axios
        // .get(`${SERVER_URL}/posts`)
        .get("http://localhost:8000/posts")
        .then((res) => {
          commit("SET_POST_STATE", res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  modules: {},
});
