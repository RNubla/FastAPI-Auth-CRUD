<template>
  <div class="home">
    <button
      @click.prevent="togglePost"
      :class="{ active: isActive }"
      v-if="isLoggedIn"
    >
      Add Posts
    </button>
    <post-entry v-if="isActive" />
    <ul>
      <li v-for="post in posts.slice().reverse()" :key="post">
        <post-card
          :title="post.title"
          :author="post.author"
          :published_on="post.published_on"
        >
          {{ post.body.substring(0, 200) + "..." }}
        </post-card>
        <!-- {{ post.title }} : {{ post.author }} {{ post.published_on }} -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostCard from "../components/PostCard.vue";
import PostEntry from "../components/PostEntry.vue";
export default {
  name: "Home",
  components: {
    // HelloWorld,
    PostEntry,
    PostCard,
  },

  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapState({
      posts: "posts",
      isLoggedIn: "loggedIn",
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
