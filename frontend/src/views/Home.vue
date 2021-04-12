<template>
  <!-- <div class="home">
    <button
      @click.prevent="togglePost"
      :class="{ active: isActive }"
      v-if="getLoginStatus"
    >
      Add Posts
    </button>
    <post-entry v-if="isActive" />
    <ul> -->
      <!-- <li v-for="post in getAllPosts.slice().reverse()" :key="post"> -->
      <!-- <li v-for="post in gettersAllPosts" :key="post">
        <post-card
          :title="post.title"
          :author="post.author"
          :published_on="post.published_on"
        >
          {{ post.body.substring(0, 200) + "..." }}
        </post-card>
      </li>
    </ul>
  </div> -->
  <div>
    <router-link to="/new-post">Add New Post</router-link>
    <div>
      <ul>
      <!-- <li v-for="post in getAllPosts.slice().reverse()" :key="post"> -->
      <li v-for="post in gettersAllPosts" :key="post">
        <post-card
          :title="post.title"
          :author="post.author"
          :published_on="post.published_on"
        >
          {{ post.body.substring(0, 200) + "..." }}
        </post-card>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PostCard from "../components/PostCard.vue";
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
    }),
    ...mapGetters("auth", {
      getLoginStatus: "getLoginStatus",
    }),
  },
  // computed: {
  //   ...mapState({
  //     posts: "posts",
  //     isLoggedIn: "loggedIn",
  //   }),
  // },
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
