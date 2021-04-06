<template>
  <div></div>
  <!-- <div class="">
      <form
  id="app"
  @submit.prevent="login"
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
      value="Login"
    >
  </p>

</form>
  </div> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapState({
      currentUser: null,
    }),
  },
};
</script>

<style>
</style>