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
      v-model="fullname"
      type="text"
    >
  </p>
  <p>
    <label >Username</label>
    <input
      v-model="username"
      type="text"
    >
  </p>

  <p>
    <label>Email</label>
    <input
      v-model="email"
    >
  </p>

  <p>
    <label >Password</label>
    <input 
      v-model="password"
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
export default {
  data() {
    return {
      errors: [],
      username: null,
      fullname: null,
      email: null,
      password: null,
    };
  },
  methods: {
    checkForm() {
      if (this.name && this.age) {
        return true;
      }

      this.errors = [];

      if (!this.username) {
        this.errors.push("Username required.");
      }
      if (!this.fullname) {
        this.errors.push("Fullname required.");
      }
      if (!this.password) {
        this.errors.push("password required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      }
    },
  },
};
</script>

<style>
</style>