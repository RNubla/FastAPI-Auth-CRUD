<template>
  <div :style="{ height: variantHeight }">
    <div class="container bg-light mt-5 pt-5 pb-5">
      <p class="fw-bold fs-4">Sign Up</p>
      <form class="container needs-validation" @submit.prevent="checkForm">
        <div class="input-group flex-nowrap mb-3">
          <!-- <label for="username" class="form-label">Username</label> -->
          <input
            type="text"
            class="form-control"
            id="validationFullname"
            aria-label="Fullname"
            placeholder="John Smith"
            aria-describedby="fullnameHelp"
            v-model="newUser.user_fullname"
            required
          />
          <div class="invalid-feedback">Please enter Fullname</div>
        </div>
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
            v-model="newUser.user_name"
            required
          />
          <div class="invalid-feedback">Please enter a username</div>
        </div>
        <div class="input-group flex-nowrap mb-3">
          <!-- <label for="username" class="form-label">Username</label> -->
          <input
            type="email"
            class="form-control"
            id="validationEmail"
            aria-label="Email"
            placeholder="johnsmith@example.com"
            aria-describedby="emailHelp"
            v-model="newUser.email"
            required
          />
          <div class="invalid-feedback">Please enter an email</div>
        </div>
        <div class="input-group flex-nowrap mb-3">
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            id="newUserPassword"
            v-model="newUser.password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Register Now</button>
      </form>
    </div>
  </div>
  <!-- <div class="container">
      <div class="">
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
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="John Smith" v-model="newUser.user_fullname" />
                </p>
                <p class="m-4">
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="Username" v-model="newUser.user_name" />
                </p>
                <p class="m-4">
                    <input class="pl-2 h-10 shadow-md inline-block align-baseline placeholder-gray-500 text-left text-lg bg-gray-100 border border-transparent focus:ouylin-none focus:ring-2 focus:ring-green-200 rounded-md focus:border-transparent" type="text" placeholder="john@example.com" v-model="newUser.email" />
                </p>
                <p class="m-4">
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
  </div> -->
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errors: [],
      variantHeight: "100vh",

      newUser: {
        user_name: null,
        email: null,
        password: null,
        user_fullname: null,
      },
    };
  },
  methods: {
    ...mapActions("register", {
      registerUser: "registerUser",
    }),
    checkForm() {
      this.errors = [];
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