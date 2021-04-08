<template>
  <div id="nav">
    <!-- <div>{{ currentUser.user_name }}</div> -->
    <!-- <div>{{ getStoredUser.user_name }}</div> -->
    <div>{{ currentUser.user_name }}</div>
    <!-- <div>{{ this.$store.getters.getStoredUser }}</div> -->
    <div>{{ token }}</div>
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      timer: null,
      // a_loggedIn: this.loggedIn,
    };
  },
  computed: {
    ...mapState({
      currentUser: "currentUser",
      token: "loginUserInputsToken",
      storedUser: "storedUser",
      loggedIn: "loggedIn",
      // storedUser: "storedUser",
    }),
    ...mapGetters({
      // getStoredUser: "getStoredUser",
      // getUsername: "getUsername",
      getIfLoggedIn: "getIfLoggedIn",
    }),
  },
  methods: {
    ...mapActions({
      refreshTokens: "refreshToken",
    }),
    autoRefresh() {
      // setInterval(this.refreshTokens(this.storedUser), 5000);
      this.refreshTokens(this.storedUser);
      console.log("refreshed tokens");
    },
    interval() {
      if (this.loggedIn == true) {
        console.log("created: getIfLoggedIn", this.getIfLoggedIn);
        // console.log("running auto refresh token");
        // this.timer = setInterval(this.autoRefresh(), 270000);
        // this.timer = setInterval(this.autoRefresh(), 100);
        this.autoRefresh();
      }
    },
    mounted() {
      // console.log("created: getIfLoggedIn", this.loggedIn);
      // if (this.loggedIn == true) {
      //   console.log("created: getIfLoggedIn", this.getIfLoggedIn);
      //   // console.log("running auto refresh token");
      //   this.timer = setInterval(this.autoRefresh(), 270000);
      // setInterval(this.autoRefresh(), 2000);
      // this.autoRefresh();
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
