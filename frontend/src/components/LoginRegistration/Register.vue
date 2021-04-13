<template>
  <div class="grid grid-flow-row shadow-lg sm:grid-flow-col">
      <div class="grid grid-flow-row">
          <div class="m-4 pt-8">
              <p class="text-center font-extrabold text-3xl ">Register</p>
            </div>

        <div class="m-4">
            <form id="app" @submit.prevent="checkForm" method="post">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <p class="m-4">
                    <!-- <input type="text" v-model="loginUserInputs.user_name" /> -->
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="John Smith" v-model="newUser.user_fullname" />
                </p>
                <p class="m-4">
                    <!-- <input type="text" v-model="loginUserInputs.user_name" /> -->
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="Username" v-model="newUser.user_name" />
                </p>
                <p class="m-4">
                    <!-- <input type="text" v-model="loginUserInputs.user_name" /> -->
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="john@example.com" v-model="newUser.email" />
                </p>
                <p class="m-4">
                    <!-- <input type="password" minlength="3" v-model="loginUserInputs.password" /> -->
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="password" placeholder="Password" minlength="3" v-model="newUser.password" />
                </p>
                <p class="m-8">
                    <input class="bg-green-200 py-2 px-10 rounded-md" type="submit" value="Sign Up" />
                </p>
            </form>
        </div>
      </div>
    <div class="bg-gradient-to-r from-green-400 to-green-500 flex justify-center">
        <div class="flex items-center my-8 ">
            <div>
                <p class="px-4 text-3xl uppercase font-semibold overflow-clip text-white">Create an account today!</p>
                <p class="font-thin text-white">Join now</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errors: [],
      newUser: {
        user_name: null,
        email: null,
        password: null,
        user_fullname: null,
      },
    };
  },
  computed: {
    // ...mapState("register", {
    //   newUser: "newUser",
    // }),
  },
  methods: {
    ...mapActions("register", {
      registerUser: "registerUser",
    }),
    checkForm() {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.newUser.user_name) {
        this.errors.push("Username required.");
      }
      if (!this.newUser.user_fullname) {
        this.errors.push("Fullname required.");
      }
      if (!this.newUser.password) {
        this.errors.push("password required.");
      }
      if (!this.newUser.email) {
        this.errors.push("Email required.");
      }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        this.registerUser(this.newUser);
        this.newUser = "";
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style>
</style>