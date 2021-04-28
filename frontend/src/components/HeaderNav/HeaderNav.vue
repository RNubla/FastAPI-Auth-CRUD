<template>
  <div class="container">
    <div class="navbar">
      <div class="homeBtnContainer">
        <button class="homeBtn" @click.prevent="goToHomePage">
          FastAPI Auth CRUD Demo
        </button>
      </div>
      <div
        class="loginRegisterContainer"
        v-if="getLoginStatus == false || getLoginStatus == null"
      >
        <div class="loginRegisterGrid">
          <router-link class="loginBtn" to="/login"><p>Login</p></router-link>
          <router-link class="registerBtn" to="/register"
            ><p>Register</p></router-link
          >
        </div>
      </div>
      <div class="loginRegisterContainer" v-else>
        <div class="loginRegisterGrid">
          <router-link to="/" class="loginBtn"
            ><p>
              {{ getAuthData.user_name }}
            </p></router-link
          >
          <div class="logoutBtn" @click="logout" to="/logout">
            <p>Logout</p>
          </div>
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
.container {
  padding: 2em 0 2em 0;
  width: 100%;
  margin: 0 0 1em 0;
  // box-shadow: 0px 6px 13px -1px #a0a0a0;
  // box-shadow: 10px 10px 10px;
}
.navbar {
  display: grid;
  // grid-template-columns: 1fr 10em 2em;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  // justify-items: start;
  grid-gap: 1rem;
  // padding: ;
}
.loginRegisterGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 2fr));
  column-gap: 0.5em;
  place-items: center;
}
.loginRegisterContainer {
  justify-self: end;
}
.homeBtnContainer {
  justify-self: start;
}
.homeBtn {
  background-color: hsl(0, 0%, 100%);
  font-family: "Courier New", Courier, monospace;
  border: none;
  color: hsl(0, 0%, 0%);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-weight: 400;
  // display: inline-block;
  font-size: 1.2em;
}
.loginBtn {
  // background-color: aqua;
  margin: 0rem 1rem 0rem 1rem;
  // padding: 0rem 0.5rem 0rem 0.5rem;
  padding: 0;
}
.logoutBtn {
  background-color: rgb(237, 137, 137);
  border-radius: 10px;
  padding: 0 2em;
}

.registerBtn {
  background-color: hsl(112.2, 73.53%, 73.33%);
  border-radius: 10px;
}
.registerBtn,
a {
  padding: 0 2em 0 2em;
}
</style>>