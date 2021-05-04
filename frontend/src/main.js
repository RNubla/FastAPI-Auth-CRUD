import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// import "./assets/tailwind.css";
// import "./assets/tailwind.css";
// import * as appRouter from "./appRouter";

createApp(App).use(store).use(router).mount("#app");
// window.addEventListener("beforeunload", () => {
//   // localStorage.removeItem("vuex");
//   localStorage.clear();
// });
// createApp(App).use(appRouter.routerConfig).use(store).mount("#app");
