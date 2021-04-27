<template>
  <div class="navbar">
    <div>
      <div>
        <button @click.prevent="goToHomePage">FastAPI Auth CRUD Demo</button>
      </div>
    </div>
    <div
      class="loginRegisterContainer"
      v-if="getLoginStatus == false || getLoginStatus == null"
    >
      <div class="loginRegisterGrid">
        <router-link class="loginBtn" to="/login"><p>Login</p></router-link>
        <router-link class="registerBtn" to="/register"
          ><p>Sign Up</p></router-link
        >
      </div>
    </div>
    <div v-else>
      <div>
        <router-link to="/login"
          ><p>
            {{ getAuthData.user_name }}
          </p></router-link
        >
        <div @click="logout" to="/logout">
          <p>Logout</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <hero /> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters("auth", {
      getLoginStatus: "getLoginStatus",
      getAuthData: "getAuthData",
      getUserId: "getUserId",
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
      localStorage.removeItem("vuex");
      // window.location.reload();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  grid-template-columns: 1fr 10em;
  place-items: center;
  justify-items: start;
}
.loginRegisterContainer {
  margin: 1fr 1fr 1fr;
}
.loginRegisterGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  place-items: center;
}
.loginBtn {
  background-color: aqua;
  margin: 0rem 1rem 0rem 1rem;
  padding: 0rem 1rem 0rem 1rem;
}
</style>>