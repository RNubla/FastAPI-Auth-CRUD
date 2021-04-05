<template>
  <div class="home">
    <ul>
      <li v-for="post in posts" :key="post">
        {{ post.title }} : {{ post.author }}
      </li>
    </ul>
  </div>
</template>

<script>
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
  methods: {
    ...mapActions({ getPost: "fetchPosts" }),
  },
  created() {
    this.getPost();
  },
};
</script>
