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
  async registerUser({ state }) {
    await axios
      .post("http://localhost:8000/auth/register", state.newUser)
      .then((res) => {
        console.log(res);
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
