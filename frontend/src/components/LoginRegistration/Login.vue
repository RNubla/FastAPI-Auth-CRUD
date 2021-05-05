<template>
  <div :style="{ height: variantHeight }">
    <div class="container bg-light mt-5 pt-5 pb-5">
      <p class="fw-bold fs-4">Login</p>
      <form class="container needs-validation" @submit.prevent="login">
        <div class="input-group flex-nowrap mb-3">
          <!-- <label for="username" class="form-label">Username</label> -->
          <span class="input-group-text" id="addon-usernameHelp">@</span>
          <input
            type="text"
            class="form-control"
            id="validationUsername"
            aria-label="Username"
            placeholder="Username"
            aria-describedby="usernameHelp"
            v-model="loginInputs.user_name"
            required
          />
          <div class="invalid-feedback">Please enter a username</div>
        </div>
        <div class="input-group flex-nowrap mb-3">
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="loginInputs.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      variantHeight: "100vh",
      errors: [],
      forms: document.querySelectorAll(".needs-validation"),
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

      // this.errors = [];
      // // if (!this.loginUserInputs.user_name) {
      // if (!this.loginInputs.user_name) {
      //   this.errors.push("Username required.");
      // }
      // // if (!this.loginUserInputs.password) {
      // if (!this.loginInputs.password) {
      //   this.errors.push("Password required.");
      // }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        // this.storedUser = this.loginUserInputs;
        await this.loginUser(this.loginInputs);
        if (this.getLoginStatus === true) {
          this.$router.push("/");
        } else {
          alert("Username or password might be incorrect");
        }
      }
    },
  },
};
</script>

<style>
</style>