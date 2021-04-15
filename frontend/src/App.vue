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
  data() {
    return {
      timer: null,
      // a_loggedIn: this.loggedIn,
    };
  },
  computed: {
    ...mapState("auth", {
      loginStatus: "loginStatus",
    }),
  },
  created() {
    //  document.addEventListener('beforeunload', this.clearLocalStorage())
  },
  methods: {
    ...mapActions({
      refreshTokens: "refreshToken",
    }),
    clearLocalStorage() {
      console.log("clear local storage");
      let storage = window.localStorage;
      storage.clear();
    },
  },
  mounted() {
    // document.addEventListener("beforeunload", this.clearLocalStorage());
  },
  beforeUnmount() {
    sessionStorage.clear();
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
