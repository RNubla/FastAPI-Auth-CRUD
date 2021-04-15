import axios from "axios";
import { jwtDecrypt, tokenAlive } from "../../middleware/jwtHelper";
const state = () => ({
  authData: {
    access_token: "",
    refresh_token: "",
    tokenExp: "",
    user_name: "",
    // user_id: "",
  },
  user_id: "",
  loginStatus: null,
});

const getters = {
  getLoginStatus(state) {
    return state.loginStatus;
  },
  getAuthData(state) {
    return state.authData;
  },
  getUserId(state) {
    return state.user_id;
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
        commit("SAVE_USER_ID", res.data.data._id);
        console.log("res.data.data", res.data.data);
        commit("SAVE_TOKEN_DATA", res.data.data);
        commit("SET_LOGIN_STATUS", true);
      })
      .catch((err) => {
        console.log(err);
        commit("SET_LOGIN_STATUS", false);
      });
  },
  logoutUser({ commit }) {
    // commit("SAVE_TOKEN_DATA", null);
    commit("REMOVE_TOKEN_DATA");
    commit("SET_LOGIN_STATUS", false);
  },
};

const mutations = {
  SAVE_TOKEN_DATA(state, data) {
    if (data == null) {
      sessionStorage.setItem("access_token", "");
      sessionStorage.setItem("refresh_token", "");
      const newTokenData = {
        access_token: "",
        refresh_token: "",
        tokenExp: "",
        user_name: "",
        // user_id: "",
      };
      state.authData = newTokenData;
    } else {
      sessionStorage.setItem("user_id", data._id);
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("refresh_token", data.refresh_token);

      const decodedJWTValues = jwtDecrypt(data.access_token);
      const newTokenData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        tokenExp: decodedJWTValues.exp,
        user_name: decodedJWTValues.sub,
        // user_id: data._id,
      };
      state.authData = newTokenData;
    }
  },
  SAVE_NEW_ACCESS_TOKEN_DATA(state, data) {
    console.log(data.access_token);
    sessionStorage.setItem("access_token", data.access_token);
    const decodedJWTValues = jwtDecrypt(data.access_token);
    const newTokenData = {
      access_token: data.access_token,
      refresh_token: sessionStorage.getItem("refresh_token"),
      tokenExp: decodedJWTValues.exp,
      user_name: decodedJWTValues.sub,
    };
    state.authData = newTokenData;
  },
  SET_LOGIN_STATUS(state, value) {
    state.loginStatus = value;
  },
  SAVE_USER_ID(state, data) {
    state.user_id = data;
  },
  REMOVE_TOKEN_DATA(state) {
    state.authData = {};
    state.user_id = "";
    sessionStorage.removeItem("vuex");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user_id");
    sessionStorage.clear();
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
