<template>
  <div>
    <hero />
  </div>
  <div>
    <router-link v-if="getLoginStatus == true" to="/new-post"
      >Add New Post</router-link
    >
    <!-- Post cards -->
    <div>
      <!-- <ul class="grid md:grid-cols-3"> -->
      <ul class="postCardGrid">
        <!-- <li v-for="post in getAllPosts.slice().reverse()" :key="post"> -->
        <li v-for="post in gettersAllPosts" :key="post">
          <post-card
            :title="post.data.content[0].content[0].text"
            :author="post.author"
            :published_on="post.published_on"
            :post_id="post.id"
            :user_id="post.user_id"
            :post_data="post.data.content"
          >
          </post-card>
        </li>
      </ul>
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
    // console.log("JSON", JSON.stringify(this.gettersAllPosts()));
  },
};
</script>

<style scoped>
.heroclass {
  padding: 1.5em;
}
ul {
  list-style: none;
}
.postCardGrid {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 0.8rem;
}
</style>