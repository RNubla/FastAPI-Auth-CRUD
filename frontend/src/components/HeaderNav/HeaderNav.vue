<template>
  <div class="">
    <nav class="pb-4 pt-4 w-100 navbar navbar-expand-md navbar-dark bg-dark" style="width: -webkit-fill-available;">
      <div class="container">
        <a class="navbar-brand user-select-none " type="" @click="goToHomePage">The Programmer Posts</a>
        <!-- Navbar toggler -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">         
            <ul class="navbar-nav ms-auto mb-2mb-lg-0" v-if="getLoginStatus == false || getLoginStatus == null">
              <li class="nav-item dropdown">
                <a 
                href="" 
                class="nav-link dropdown-toggle" 
                id='navbarDropdown' 
                role="button" 
                data-bs-toggle="dropdown"
                aria-expanded="false">Login/Register
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><router-link class="dropdown-item" to="/login">Login</router-link></li>
                  <li><router-link class="dropdown-item" to="/register">Register</router-link></li>                 
                </ul>
              </li>
            </ul>    
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-else>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ getAuthData.user_name }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><a class="dropdown-item" href="#">Account</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" type="Button" @click="logout" to=/logout>Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
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
// .container {
//   padding: 2em 0 2em 0;
//   width: 100%;
//   margin: 0 0 1em 0;
//   // box-shadow: 0px 6px 13px -1px #a0a0a0;
//   // box-shadow: 10px 10px 10px;
// }
// .navbar {
//   display: grid;
//   // grid-template-columns: 1fr 10em 2em;
//   grid-template-columns: 1fr 1fr;
//   place-items: center;
//   // justify-items: start;
//   grid-gap: 1rem;
//   // padding: ;
// }
// .loginRegisterGrid {
//   display: grid;
//   grid-template-columns: repeat(2, minmax(0, 2fr));
//   column-gap: 0.5em;
//   place-items: center;
// }
// .loginRegisterContainer {
//   justify-self: end;
// }
// .homeBtnContainer {
//   justify-self: start;
// }
// .homeBtn {
//   background-color: hsl(0, 0%, 100%);
//   font-family: "Courier New", Courier, monospace;
//   border: none;
//   color: hsl(0, 0%, 0%);
//   padding: 15px 32px;
//   text-align: center;
//   text-decoration: none;
//   font-weight: 400;
//   // display: inline-block;
//   font-size: 1.2em;
// }
// .loginBtn {
//   // background-color: aqua;
//   margin: 0rem 1rem 0rem 1rem;
//   // padding: 0rem 0.5rem 0rem 0.5rem;
//   padding: 0;
// }
// .logoutBtn {
//   background-color: rgb(237, 137, 137);
//   border-radius: 10px;
//   padding: 0 2em;
// }

// .registerBtn {
//   background-color: hsl(112.2, 73.53%, 73.33%);
//   border-radius: 10px;
// }
// .registerBtn,
// a {
//   padding: 0 2em 0 2em;
// }
</style>>