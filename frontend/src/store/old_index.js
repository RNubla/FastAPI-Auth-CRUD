import { createStore } from "vuex";
const axios = require("axios");
// const SERVER_URL = "http:localhost:8000";
// const registerModule = {};

export default createStore({
  state: {
    /* FOR POSTS */
    inputPost: {
      title: null,
      body: null,
      post_img: "something here",
      published_on: new Date().toUTCString,
    },
    posts: [],
    inputPostData: null,
    currentUser: {
      user_name: null,
    },
    /* *** END OF POST *** */
    /* FOR LOGGING IN */
    loginUserInputs: {
      user_name: null,
      password: null,
    },
    loginUserInputsToken: null,
    storedUser: null,
    /* *** END OF LOGGING IN *** */
    /* FOR REGISTERING */
    newUser: {
      user_name: null,
      email: null,
      password: null,
      user_fullname: null,
    },
    /* implement refresh token */
    tokenTimeout: null,
    loggedIn: false,
  },
  getters: {
    getAllPosts: (state) => {
      return state.posts;
    },
    getInputPostData: (state) => {
      return state.inputPostData;
    },
    getloginUserInputsToken: (state) => {
      return state.loginUserInputsToken;
    },
    getUsername: (state) => {
      // return state.loginUserInputs.user_name;
      return state.storedUser.user_name;
    },
    getStoredUser: (state) => {
      return state.storedUser;
    },
    getIfLoggedIn: (state) => {
      return state.loggedIn;
    },
  },
  mutations: {
    SET_POSTS_STATE(state, payload) {
      state.posts = payload;
    },
    SET_USER_AUTH_TOKEN(state, payload) {
      state.loginUserInputsToken = payload;
    },
    SET_USERNAME(state) {
      // state.currentUser = getters.getUsername;
      state.currentUser.user_name = state.storedUser.user_name;
    },
    SET_STORED_USER(state, payload) {
      state.storedUser = payload;
    },
    SET_LOGGED_IN(state) {
      state.loggedIn = true;
    },
    SET_LOGGED_OFF(state) {
      state.loggedIn = false;
    },
    ADD_POST(state, payload) {
      state.posts.push(payload);
    },
    SET_INPUT_POST_DATA(state, payload) {
      state.inputPostData = payload;
    },
    SET_INPUT_POST_DATA_TO_INPUT_POST(state, payload) {
      state.inputPost = payload;
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
    // async loginUser({ state, commit, getters }) {
    async loginUser({ commit, getters }, payload) {
      await axios
        // .post("http://localhost:8000/auth/login", state.loginUserInputs)
        .post("http://localhost:8000/auth/login", payload)
        .then((res) => {
          // commit("SET_STORED_USER", state.loginUserInputs);
          console.log("payload", payload);
          commit("SET_STORED_USER", payload);
          commit("SET_USER_AUTH_TOKEN", res.data.data);
          // console.log("getters:", getters.getStoredUser);
          if (getters.getloginUserInputsToken != null) {
            commit("SET_LOGGED_IN");
            commit("SET_USERNAME");
          } else {
            commit("SET_LOGGED_OFF");
          }
          // setInterval(console.log("interval", getters.getStoredUser), 2000);
          // setInterval(dispatch("refreshToken", getters.getStoredUser), 5000);
          // setInterval(dispatch("refreshToken"), 3000);
          // console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async refreshToken({ commit }, payload) {
      await axios
        .post("http://localhost:8000/auth/refresh", payload)
        .then((res) => {
          // console.log(payload);
          commit("SET_USER_AUTH_TOKEN", res.data.data);
          commit("SET_USERNAME");
          console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    },
    async addPost({ state, commit, dispatch, getters }) {
      let tempPayload = state.inputPost;
      await axios
        .post("http://localhost:8000/posts", state.inputPost, {
          headers: {
            Authorization: `Bearer ${state.loginUserInputsToken}`,
          },
        })
        .then((res) => {
          commit("ADD_POST", res.data.data);
          commit("SET_INPUT_POST_DATA", tempPayload);
          console.log(res.data);
        })
        .catch((e) => {
          // console.log(e.response.data);
          // console.log(e.response.status);
          if (e.response.status === 401) {
            // console.log("error:", e);
            dispatch("refreshToken", getters.getStoredUser);
            commit(
              "SET_INPUT_POST_DATA_TO_INPUT_POST",
              getters.getInputPostData
            );
            console.log(getters.getInputPostData);
          }
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
