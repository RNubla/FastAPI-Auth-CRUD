<template>
  <div id="nav">
    <header-nav/>
    <!-- <div>{{ currentUser.user_name }}</div> -->
    <!-- <div>{{ getStoredUser.user_name }}</div> -->
    <!-- <div>{{ currentUser.user_name }}</div> -->
    <!-- <div>{{ this.$store.getters.getStoredUser }}</div> -->
    <!-- <div>{{ token }}</div> -->
    <!-- {{ getNewUserData }} -->
    {{ getAuthData.user_name }}
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/new-post">New Post</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/logout">Logout</router-link> | -->
  </div>
  <router-view />
</template>

<script>
import HeaderNav from './components/HeaderNav/HeaderNav'
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components:{
    HeaderNav
  },
  data() {
    return {
      timer: null,
      // a_loggedIn: this.loggedIn,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getAuthData: "getAuthData",
    }),
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
