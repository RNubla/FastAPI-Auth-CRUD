<template>
  <div id="nav">
    <!-- <div>{{ currentUser.user_name }}</div> -->
    <div>{{ getStoredUser.user_name }}</div>
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
  computed: {
    ...mapState({
      currentUser: "currentUser",
      token: "loginUserInputsToken",
    }),
    ...mapGetters({
      getStoredUser: "getStoredUser",
    }),
  },
  methods: {
    ...mapActions({
      refreshTokens: "refreshToken",
    }),
    async autoRefresh() {
      await setInterval(this.refreshTokens(this.getStoredUser), 5000);
    },
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
