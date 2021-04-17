<template>
  <div class="flex flex-col">
    <div>
      <hero />
    </div>
    <div>
      <div>Post</div>
    </div>
    <div>
      <router-link v-if="getLoginStatus == true" to="/new-post"
        >Add New Post</router-link
      >
      <div class="px-5 mx-5">
        <div class="w-full h-auto">
          <div class="grid grid-rows-3 grid-flow-col gap-4">
            <div class="col-span-2 bg-red-100">1</div>
            <div class="row-span-2 col-span-2 bg-red-400">2</div>
            <div class="row-span-3 bg-red-500">3</div>
          </div>
          <!-- <ul class="grid md:grid-cols-3"> -->
          <ul class="flex flex-row">
            <!-- <li v-for="post in getAllPosts.slice().reverse()" :key="post"> -->
            <li
              v-for="post in gettersAllPosts"
              :key="post"
              class="object-contain"
            >
              <post-card
                class="w-auto"
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
