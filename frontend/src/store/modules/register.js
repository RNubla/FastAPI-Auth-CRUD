import axios from "axios";

const state = () => ({
  newUser: {
    user_name: null,
    email: null,
    password: null,
    user_fullname: null,
  },
});

const actions = {
  async registerUser({ commit }, payload) {
    await axios
      // .post("http://localhost:8000/auth/register", payload)
      .post(`${process.env.VUE_APP_LOCAL_HOST_SERVER}/auth/register`, payload)
      .then((res) => {
        console.log(res);
        commit("SET_NEW_USER", payload);
      })
      .catch((e) => {
        console.log("vuex:", e.response.data);
      });
  },
};
const mutations = {
  SET_NEW_USER(state, payload) {
    state.newUser = payload;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
