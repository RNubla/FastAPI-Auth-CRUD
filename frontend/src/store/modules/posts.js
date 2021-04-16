import axios from "axios";
import store from "..";
import jwtInterceptor from "../../middleware/jwtInterceptor";
const state = () => ({
  posts: [],
  singlePostId: "",
  singlePost: {},
  inputPost: {
    title: null,
    body: null,
    post_img: "something here",
    published_on: new Date().toUTCString,
  },
});
const getters = {
  getAllPosts(state) {
    return state.posts;
  },
  getPostID(state) {
    return state.singlePostId;
  },
  getSinglePost(state) {
    return state.singlePost;
  },
};

const actions = {
  async getAllPosts({ commit }) {
    console.log("Getting All Post");
    // var response = await jwtInterceptor.get("http://localhost:8000/posts/");
    var response = await jwtInterceptor.get(
      `${process.env.VUE_APP_LOCAL_HOST_SERVER}/posts`
    );
    console.log(process.env.VUE_APP_LOCAL_HOST_SERVER);
    if (response && response.data) {
      console.log("post_module", response.data.data);
      commit("SET_POSTS", response.data.data);
    }
  },
  async fetchAPost({ commit, state }, payload) {
    console.log("get a single post", payload);
    commit("SET_SINGLE_POST_ID", payload);
    var response = await jwtInterceptor.get(
      // `http://localhost:8000/posts/${state.singlePostId}`
      `${process.env.VUE_APP_LOCAL_HOST_SERVER}/posts/${state.singlePostId}`
      // state.singlePostId
    );
    if (response && response.data) {
      console.log("post module: get single post", response.data.data);
      commit("SET_SINGLE_POST", response.data.data);
    }
  },
  // TODO:Edit post if current user matches with the post user_id
  async editAPost({ state }, payload) {
    console.log("edit post payload: ", payload);
    const authData = store.getters["auth/getAuthData"];
    const tokenActive = store.getters["auth/isTokenActive"];
    if (tokenActive == false) {
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
      store.commit("auth/SAVE_NEW_ACCESS_TOKEN_DATA", refreshResponse.data);
    }

    var response = await jwtInterceptor.put(
      // `http://localhost:8000/posts/${state.singlePostId}`,
      `${process.env.VUE_APP_LOCAL_HOST_SERVER}/posts/${state.singlePostId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${store.getters["auth/getAuthData"].access_token}`,
        },
      }
    );
    if (response && response.data) {
      console.log("post module: update single post", response.config.data);
      // commit("SET_SINGLE_POST", response.config.data);
    }
  },
  /*  FIXME:When user stays on the new post entry for a
      while, the access token expires and cannot make post
  */
  async addPost({ commit, state }, payload) {
    // console.log("addpost payload", payload);
    commit("SET_INPUT_POST", payload);
    const authData = store.getters["auth/getAuthData"];
    const tokenActive = store.getters["auth/isTokenActive"];
    if (tokenActive == false) {
      console.log("REFRESHING ACCESS TOKEN");
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
      store.commit("auth/SAVE_NEW_ACCESS_TOKEN_DATA", refreshResponse.data);
    }
    var response = await jwtInterceptor.post(
      // "http://localhost:8000/posts/",
      "${process.env.VUE_APP_LOCAL_HOST_SERVER}/posts/",
      state.inputPost,
      {
        headers: {
          Authorization: `Bearer ${store.getters["auth/getAuthData"].access_token}`,
        },
      }
    );
    if (response && response.data) {
      console.log("post_module, addPost:", response.data.data);
      commit("ADD_POST", response.data.data);
    }
  },
};

const mutations = {
  SET_POSTS(state, payload) {
    state.posts = payload;
  },
  SET_INPUT_POST(state, payload) {
    state.inputPost = payload;
  },
  ADD_POST(state, payload) {
    state.posts.push(payload);
  },
  SET_SINGLE_POST_ID(state, payload) {
    state.singlePostId = payload;
  },
  SET_SINGLE_POST(state, payload) {
    state.singlePost = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
