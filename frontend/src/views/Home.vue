<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- {{ this.$store.state.posts }} -->
    <!-- {{ posts }} -->
    <ul>
      <li v-for="post in posts" :key="post">
        {{ post.title }} : {{ post.author }}
      </li>
    </ul>
    <!-- <button @click.prevent="fetchPosts">HI</button> -->
  </div>
</template>

<script>
// import { onMounted, ref } from "vue";
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  computed: {
    ...mapState({
      posts: "posts",
    }),
  },
  data() {
    return {
      // posts: null,
    };
  },
  methods: {
    ...mapActions({ getPost: "fetchPosts" }),
  },
  created() {
    this.getPost();
  },
};
</script>
