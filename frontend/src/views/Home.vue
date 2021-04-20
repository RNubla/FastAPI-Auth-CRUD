<template>
  <div class="flex flex-col">
    <div>
      <hero />
    </div>
    <div>
      <router-link v-if="getLoginStatus == true" to="/new-post"
        >Add New Post</router-link
      >
      <!-- Post cards -->
      <div class="mx-2 my-10 border-t-2">
        <!-- <ul class="grid md:grid-cols-3"> -->
        <ul class="mt-10 flex flex-row overflow-auto">
          <!-- <li v-for="post in getAllPosts.slice().reverse()" :key="post"> -->
          <li v-for="post in gettersAllPosts" :key="post" class="mx-8">
            <post-card
              class="w-72 border-2 border-gray-100"
              :title="post.data.blocks[0].data.text"
              :author="post.author"
              :published_on="post.published_on"
              :post_id="post.id"
              :user_id="post.user_id"
              :post_data="post.data.blocks"
            >
            </post-card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Hero from "../components/Hero/Hero.vue";
import PostCard from "../components/Post/PostCard.vue";
// import PostEntry from "../components/PostEntry.vue";
export default {
  name: "Home",
  components: {
    // HelloWorld,
    // PostEntry,
    Hero,
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
