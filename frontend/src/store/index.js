import { createStore } from "vuex";
const axios = require("axios");
// const SERVER_URL = "http:localhost:8000";
// const registerModule = {};

export default createStore({
  state: {
    inputPost: {
      title: null,
      body: null,
      post_img: "something here",
      published_on: new Date().toUTCString,
    },
    posts: [],
    currentUser: {
      user_name: null,
    },
    loginUserInputs: {
      user_name: null,
      password: null,
    },
    loginUserInputsToken: null,
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
    getloginUserInputsToken: (state) => {
      return state.loginUserInputsToken;
    },
    getUsername: (state) => {
      return state.loginUserInputs.user_name;
    },
  },
  mutations: {
    SET_POSTS_STATE(state, payload) {
      state.posts = payload;
    },
    SET_USER_AUTH_TOKEN(state, payload) {
      state.loginUserInputsToken = payload;
    },
    SET_USERNAME(state, getters) {
      state.currentUser = getters.getUsername;
    },
    ADD_POST(state, payload) {
      state.posts.push(payload);
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
    async loginUser({ state, commit }) {
      await axios
        .post("http://localhost:8000/auth/login", state.loginUserInputs)
        .then((res) => {
          commit("SET_USER_AUTH_TOKEN", res.data.data);
          // commit("SET_USERNAME");
          console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    },
    async addPost({ state, commit }) {
      await axios
        .post("http://localhost:8000/posts", state.inputPost, {
          headers: {
            Authorization: `Bearer ${state.loginUserInputsToken}`,
          },
        })
        .then((res) => {
          commit("ADD_POST", res.data.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e.response.data);
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
