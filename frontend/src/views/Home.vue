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
        <li v-for="post in getAllPosts" :key="post">
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
import { computed, onMounted } from "vue";
// import { mapActions, mapGetters } from "vuex";
import { useStore } from "vuex";
import Hero from "../components/Hero/Hero.vue";
import PostCard from "../components/Post/PostCard.vue";
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
  setup() {
    const store = useStore();
    const getAllPosts = computed(() => store.getters["posts/getAllPosts"]);
    const getPostId = computed(() => store.getters["posts/getPostID"]);
    const getLoginStatus = computed(() => store.getters["auth/getLoginStatus"]);
    const getAllPostsAction = store.dispatch("posts/getAllPosts");
    onMounted(() => {
      getAllPostsAction;
    });
    return {
      getAllPosts,
      getPostId,
      getLoginStatus,
    };
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