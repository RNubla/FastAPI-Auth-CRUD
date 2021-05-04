<template>
  <div class="mb-5">
    <header-nav class="w-100" />
    <router-view />
  </div>
  <v-footer />
</template>

<script>
import HeaderNav from "./components/HeaderNav/HeaderNav";
import { computed } from "vue";
import { useStore } from "vuex";
import VFooter from "./components/Footer/V-Footer.vue";
export default {
  components: {
    HeaderNav,
    VFooter,
  },
  setup() {
    const store = useStore();
    const loginStatus = computed(() => store.getters["auth/loginStatus"]);
    return {
      loginStatus,
    };
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "FastAPI Auth CRUD Demo";
    },
  },
};
</script>
<style lang="scss">
a {
  text-decoration: none;
}
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Courier New", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // padding: 0 0.8rem;
  // background-color: hsl(30, 33%, 93%);
  // padding: 0 1em 0 1em;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
