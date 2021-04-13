<template>
  <div class="grid grid-flow-row sm:grid-flow-col">
    <div class="flex justify-center items-center sm:justify-start">
      <div class="m-2">
        <button @click.prevent="goToHomePage">Website Name</button>
      </div>
    </div>
    <div v-if="getLoginStatus == false">
      <div class="flex justify-center items-center sm:justify-end">
        <router-link class="m-2 p-3 shadow-md hover:bg-gray-50" to="/login"
          ><p class="text-black text-center">Login</p></router-link
        >
        <router-link
          class="m-2 bg-green-300 p-3 shadow-md hover:bg-green-400"
          to="/register"
          ><p class="text-black text-center">Sign Up</p></router-link
        >
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center sm:justify-end">
        <router-link class="m-2 p-3 shadow-md hover:bg-gray-50" to="/login"
          ><p class="text-black text-center">
            {{ getAuthData.user_name }}
          </p></router-link
        >
        <div
          @click="logout"
          class="m-2 bg-red-300 p-3 shadow-md hover:bg-red-400"
          to="/logout"
        >
          <p class="text-black text-center font-bold">Logout</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", {
      getLoginStatus: "getLoginStatus",
      getAuthData: "getAuthData",
    }),
  },
  methods: {
    ...mapActions("auth", {
      logoutUser: "logoutUser",
    }),
    goToHomePage() {
      this.$router.push({ name: "Home" });
    },
    logout() {
      this.logoutUser();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
</style>