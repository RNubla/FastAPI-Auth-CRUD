<template>
  <div class="grid grid-flow-col shadow-lg">
      <div class="grid grid-flow-row">
          <div class="m-4 pt-8">
              <p class="text-center font-extrabold text-3xl ">Login</p>
            </div>

        <div class="m-4">
            <form id="app" @submit.prevent="login" method="post">
                <p class="mb-8" v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <p class="mx-4 ">
                    <!-- <input type="text" v-model="loginUserInputs.user_name" /> -->
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="Username" v-model="loginInputs.user_name" />
                </p>
                <p class="m-4">
                    <!-- <input type="password" minlength="3" v-model="loginUserInputs.password" /> -->
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="password" placeholder="Password" minlength="3" v-model="loginInputs.password" />
                </p>
                <p class="m-8">
                    <input class="bg-green-300 py-2 px-10 rounded-md shadow-md" type="submit" value="Log In" />
                </p>
            </form>
        </div>
      </div>
    <div class="bg-gradient-to-r from-green-400 to-green-500 flex justify-center">
        <div class="flex items-center  ">
            <div class="px-8">
                <p class="text-3xl uppercase font-semibold overflow-clip text-white">Log In into your account!</p>
                <p class="font-thin text-white">Post anything you want</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
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
      }
    },
  },
};
</script>

<style>
</style>