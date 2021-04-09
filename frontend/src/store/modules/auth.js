import axios from "axios";
import { jwtDecrypt, tokenAlive } from "../../middleware/jwtHelper";
const state = () => ({
  authData: {
    access_token: "",
    refresh_token: "",
    tokenExp: "",
    user_name: "",
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
  logoutUser({ commit }) {
    commit("SAVE_TOKEN_DATA", null);
    commit("SET_LOGIN_STATUS", false);
  },
};

const mutations = {
  SAVE_TOKEN_DATA(state, data) {
    if (data == null) {
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
      const newTokenData = {
        access_token: "",
        refresh_token: "",
        tokenExp: "",
        user_name: "",
      };
      state.authData = newTokenData;
    } else {
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
    }
  },
  SAVE_NEW_ACCESS_TOKEN_DATA(state, data){
    console.log(data.access_token)
    localStorage.setItem('access_token', data.access_token)
    const decodedJWTValues = jwtDecrypt(data.access_token);
      const newTokenData = {
        access_token: data.access_token,
        refresh_token: localStorage.getItem('refresh_token'),
        tokenExp: decodedJWTValues.exp,
        user_name: decodedJWTValues.sub,
      };
      state.authData = newTokenData;
  },
  SET_LOGIN_STATUS(state, value) {
    state.loginStatus = value;
  },
  REMOVE_TOKEN_DATA() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // commit("SET_LOGIN_STATUS", false);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
