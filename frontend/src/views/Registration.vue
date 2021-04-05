<template>
  <div class="">
      <form
  id="app"
  @submit.prevent="checkForm"
  action="https://vuejs.org/"
  method="post"
>

  <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>

  <p>
    <label >Full Name</label>
    <input
      v-model="newUser.user_fullname"
      type="text"
    >
  </p>
  <p>
    <label >Username</label>
    <input
      v-model="newUser.user_name"
      type="text"
    >
  </p>

  <p>
    <label>Email</label>
    <input
      v-model="newUser.email"
    >
  </p>

  <p>
    <label >Password</label>
    <input 
      v-model="newUser.password"
      type="password"
      minlength="3"
    >
  </p>


  <p>
    <input
      type="submit"
      value="Submit"
    >
  </p>

</form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// const axios = require("axios");
export default {
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapState({
      newUser: "newUser",
    }),
  },
  methods: {
    ...mapActions({
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
        this.registerUser();
      }
    },
  },
};
</script>

<style>
</style>