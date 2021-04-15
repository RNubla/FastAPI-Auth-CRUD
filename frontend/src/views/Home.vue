<template>
  <div>
    <router-link v-if="getLoginStatus == true" to="/new-post"
      >Add New Post</router-link
    >
    <div class="container mx-auto">
      <ul class="grid md:grid-cols-3">
        <!-- <li v-for="post in getAllPosts.slice().reverse()" :key="post"> -->
        <li v-for="post in gettersAllPosts" :key="post" class="object-contain">
          <post-card
            :title="post.data.blocks[0].data.text"
            :author="post.author"
            :published_on="post.published_on"
            :post_id="post.id"
            :user_id="post.user_id"
          >
            <!-- {{ post.body.substring(0, 200) + "..." }} -->
            <!-- {{ post.id }} -->
            <!-- {{ post.body }} -->
          </post-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostCard from "../components/Post/PostCard.vue";
// import PostEntry from "../components/PostEntry.vue";
export default {
  name: "Home",
  components: {
    // HelloWorld,
    // PostEntry,
    PostCard,
  },

  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapGetters("posts", {
      gettersAllPosts: "getAllPosts",
      // getSinglePost: "getSinglePost",
      getPostID: "getPostID",
    }),
    ...mapGetters("auth", {
      getLoginStatus: "getLoginStatus",
    }),
  },
  methods: {
    ...mapActions("posts", { getAllPosts: "getAllPosts" }),
    togglePost() {
      this.isActive = !this.isActive;
    },
  },
  created() {
    this.getAllPosts();
  },
};
</script>
