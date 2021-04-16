<template>
  <div id="nav">
    <header-nav />
  </div>
  <router-view />
</template>

<script>
import HeaderNav from "./components/HeaderNav/HeaderNav";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    HeaderNav,
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "FastAPI Auth CRUD Demo";
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState("auth", {
      loginStatus: "loginStatus",
    }),
  },
  methods: {
    ...mapActions({
      refreshTokens: "refreshToken",
    }),
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
