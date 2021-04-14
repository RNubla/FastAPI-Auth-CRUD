<template>
  <div @click="logoutUser">Log Out</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", {
      logoutUser: "logoutUser",
    }),
    // logout() {
    // this.logoutUser()
    // },
  },
};
</script>

<style>
</style>