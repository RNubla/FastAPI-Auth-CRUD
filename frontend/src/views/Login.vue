<template>
  <!-- <div></div> -->
  <div class="">
    <form id="app" @submit.prevent="login" method="post">
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
      <p>
        <label>Username</label>
        <input type="text" v-model="loginUserInputs.user_name" />
      </p>

      <p>
        <label>Password</label>
        <input type="password" minlength="3" v-model="loginUserInputs.password" />
      </p>

      <p>
        <input type="submit" value="Login" />
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      errors: [],
      storedUser: null,
    };
  },
  computed: {
    ...mapState({
      loginUserInputs: "loginUserInputs",
      // storedUser: "storedUser",
    }),
    ...mapGetters({
      getStoredUser: "getStoredUser",
    }),
  },
  methods: {
    ...mapActions({
      loginUser: "loginUser",
      refreshToken: "refreshToken",
    }),

    autoRefreshToken() {
      // await setInterval(this.refreshToken(this.getStoredUser), 5000);
      setInterval(console.log(this.getStoredUser), 5000);
    },

    async login() {
      this.storedUser = this.loginUserInputs;

      this.errors = [];
      if (!this.loginUserInputs.user_name) {
        this.errors.push("Username required.");
      }
      if (!this.loginUserInputs.password) {
        this.errors.push("Password required.");
      }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        // this.storedUser = this.loginUserInputs;
        await this.loginUser();
        this.autoRefreshToken();
        // setTimeout(this.loginUser(), 3000);
        // setInterval(this.refreshToken(), 3000);
        // this.refreshToken()
        this.loginUserInputs.user_name = null;
        this.loginUserInputs.password = null;
      }
    },
  },
};
</script>

<style>
</style>