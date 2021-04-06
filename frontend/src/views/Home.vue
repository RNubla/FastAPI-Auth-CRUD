<template>
  <div class="home">
    <button @click.prevent="togglePost" :class="{ active: isActive }">
      Add Posts
    </button>
    <post-entry v-if="isActive" />
    <ul>
      <li v-for="post in posts" :key="post">
        {{ post.title }} : {{ post.author }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostEntry from "../components/PostEntry.vue";
export default {
  name: "Home",
  components: {
    // HelloWorld,
    PostEntry,
  },
  data() {
    PostEntry;
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapState({
      posts: "posts",
    }),
  },
  methods: {
    ...mapActions({ getPost: "fetchPosts" }),
    togglePost() {
      this.isActive = !this.isActive;
    },
  },
  created() {
    this.getPost();
  },
};
</script>
