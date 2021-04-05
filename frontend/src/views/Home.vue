<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ul>
      <li v-for="post in posts" :key="post">
        {{ post }}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  computed: mapGetters({
    posts: "getAllPosts",
  }),
  methods: {
    ...mapActions({
      fetchPosts: "fetchPosts",
    }),
  },
  created() {
    this.fetchPosts;
  },
};
</script>
