<template>
  <!-- <div></div> -->
  <!-- <div class="">
    <form id="app" @submit.prevent="login" method="post">
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
      <p>
        <label>Username</label>
        <input type="text" v-model="loginInputs.user_name" />
      </p>

      <p>
        <label>Password</label>
        <input type="password" minlength="3" v-model="loginInputs.password" />
      </p>

      <p>
        <input type="submit" value="Login" />
      </p>
    </form>
  </div> -->

  <div class="container mx-auto px-24 rounded-lg"><login /></div>
</template>

<script>
import Login from "../components/LoginRegistration/Login";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    Login,
  },
  data() {
    return {
      errors: [],
      storedUser: null,
      loginInputs: {
        user_name: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState({
      // loginUserInputs: "loginUserInputs",
      // storedUser: "storedUser",
    }),
    ...mapGetters("auth", {
      // getStoredUser: "getStoredUser",
      getLoginStatus: "getLoginStatus",
    }),
  },
  methods: {
    ...mapActions("auth", {
      loginUser: "loginUser",
      // refreshToken: "refreshToken",
    }),

    async login() {
      this.storedUser = this.loginUserInputs;

      this.errors = [];
      // if (!this.loginUserInputs.user_name) {
      if (!this.loginInputs.user_name) {
        this.errors.push("Username required.");
      }
      // if (!this.loginUserInputs.password) {
      if (!this.loginInputs.password) {
        this.errors.push("Password required.");
      }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        // this.storedUser = this.loginUserInputs;
        await this.loginUser(this.loginInputs);
        if (this.getLoginStatus === true) {
          this.$router.push("/");
        } else {
          alert("Login failed");
        }
        // this.autoRefreshToken();
        // setTimeout(this.loginUser(), 3000);
        // setInterval(this.refreshToken(), 3000);
        // this.refreshToken()
        // this.loginUserInputs.user_name = null;
        // this.loginInputs.user_name = null;
        // this.loginUserInputs.password = null;
        // this.loginInputs.password = null;
      }
    },
  },
};
</script>

<style>
</style>