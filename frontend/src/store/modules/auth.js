import axios from "axios";
import { jwtDecrypt, tokenAlive } from "../../middleware/jwtHelper";
const state = () => ({
  authData: {
    access_token: null,
    refresh_token: null,
    tokenExp: null,
    user_name: null,
  },
  loginStatus: null,
});

const getters = {
  getLoginStatus(state) {
    return state.loginStatus;
  },
  getAuthData(state) {
    return state.authData;
  },
  isTokenActive(state) {
    if (!state.authData.tokenExp) {
      return false;
    } else {
      return tokenAlive(state.authData.tokenExp);
    }
  },
};

const actions = {
  async loginUser({ commit }, payload) {
    await axios
      .post("http://localhost:8000/auth/login", payload)
      .then((res) => {
        commit("SAVE_TOKEN_DATA", res.data.data);
        commit("SET_LOGIN_STATUS", true);
      })
      .catch((err) => {
        console.log(err);
        commit("SET_LOGIN_STATUS", false);
      });
  },
};

const mutations = {
  SAVE_TOKEN_DATA(state, data) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    const decodedJWTValues = jwtDecrypt(data.access_token);
    const newTokenData = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      tokenExp: decodedJWTValues.exp,
      user_name: decodedJWTValues.sub,
    };
    state.authData = newTokenData;
  },
  SET_LOGIN_STATUS(state, value) {
    state.loginStatus = value;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
