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
// const { mapActions } = require("vuex");
const axios = require("axios");
export default {
  data() {
    return {
      errors: [],
      newUser: {
        user_name: null,
        user_fullname: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async registerUser(payload_data) {
      // await axios(`${SERVER_URL}/auth/register`, payload_data)
      await axios
        .post("http://localhost:8000/auth/register", payload_data, {
          headers: {
            "Content-Type": "Content-Type: application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          // commit("REGISTER_USER", res.data.data);
          console.log(res);
        })
        .catch((e) => {
          console.log("vuex: ", e.response.data);
        });
    },
    // ...mapActions({
    //   registerNewUser: "registerUser",
    // }),
    convertToJson(data) {
      return JSON.parse(JSON.stringify(data));
    },
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
        // console.log(this.newUser);
        // console.log(JSON.parse(JSON.stringify(this.newUser)));
        console.log(this.convertToJson(this.newUser));
        this.registerUser(this.newUser);
        // this.$store.dispatch("registerUser", this.convertToJson(this.newUser));
        // this.registerNewUser(this.convertToJson(this.newUser));
      }
    },
  },
};
</script>

<style>
</style>