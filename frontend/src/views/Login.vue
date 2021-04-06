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
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapState({
      loginUserInputs: "loginUserInputs",
    }),
  },
  methods: {
    ...mapActions({
      loginUser: "loginUser",
    }),
    login() {
      this.errors = [];
      if (!this.loginUserInputs.user_name) {
        this.errors.push("Username required.");
      }
      if (!this.loginUserInputs.password) {
        this.errors.push("Password required.");
      }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        this.loginUser();
        this.loginUserInputs.user_name = null;
        this.loginUserInputs.password = null;
      }
    },
  },
};
</script>

<style>
</style>