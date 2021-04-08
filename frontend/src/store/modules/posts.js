import jwtInterceptor from "../../middleware/jwtInterceptor";
const state = () => ({
  posts: [],
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
};

const actions = {
  async getAllPosts({ commit }) {
    var response = await jwtInterceptor.get("http://localhost:8000/posts");
    if (response && response.data) {
      console.log("post_module", response.data.data);
      commit("SET_POSTS", response.data.data);
    }
  },
  async addPost({ commit }, payload) {
    var response = await jwtInterceptor.post(
      "http://localhost:8000/posts",
      payload
    );
    console.log("addpost payload", payload);
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
  ADD_POST(state, payload) {
    state.post.push(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
