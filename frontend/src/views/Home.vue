<template>
  <div class="home">
    <button @click.prevent="togglePost" :class="{ active: isActive }">
      Add Posts
    </button>
    <post-entry v-if="isActive" />
    <ul>
      <li v-for="post in posts" :key="post">
        <post
          :title="post.title"
          :author="post.author"
          :published_on="post.published_on"
        >
          {{ post.body.substring(0, 200) + "..." }}
        </post>
        <!-- {{ post.title }} : {{ post.author }} {{ post.published_on }} -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Post from "../components/post.vue";
import PostEntry from "../components/PostEntry.vue";
export default {
  name: "Home",
  components: {
    // HelloWorld,
    PostEntry,
    Post,
  },

  data() {
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
