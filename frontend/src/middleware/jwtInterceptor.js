import axios from "axios";
import store from "../store/index";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config) => {
  const authData = store.getters["auth/getAuthData"];
  if (authData == null) {
    return config;
  }
  config.headers.common["Authorization"] = `bearer ${authData.access_token}`;
  return config;
});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = store.getters["auth/getAuthData"];
      const payload = {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
      };
      var response = await axios
        .post("http://localhost:8000/auth/refresh", payload)
        .catch((e) => {
          console.log(e);
        });
      await store.dispatch("auth/SAVE_TOKEN_DATA", response.data.data);
      error.config.headers[
        "Authorization"
      ] = `bearer ${response.data.data.access_token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
