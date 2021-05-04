<template>
  <hero />

  <div>
    <router-link v-if="getLoginStatus == true" to="/new-post"
      >Add New Post</router-link
    >
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4 w-100 px-4 m-auto">
    <card
      :title="post.data.content[0].content[0].text"
      :paragraph="post.data.content[1].content[0].text"
      :author="post.author"
      :published_on="post.published_on"
      :post_id="post.id"
      :user_id="post.user_id"
      :post_data="post.data.content"
      v-for="post in getAllPosts"
      :key="post"
    />
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import Hero from "../components/Hero/Hero.vue";
// import PostCard from "../components/Post/PostCard.vue";
import Card from "../components/PostV2/Card";
export default {
  name: "Home",
  components: {
    Hero,
    // PostCard,
    Card,
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
/* .heroclass { */
/* padding: 1.5em 6em; */
/* margin: auto; */
/* padding: 0 clamp(1ch, 16vw, 48ch); */
/* } */
/* .heroclass-parent {
  width: clamp(120px, 2vw, 480px);
} */
/* .cardClass {
  padding: 0 clamp(1ch, 16vw, 48ch);
} */
/* ul {
  list-style: none;
}
.postCardGrid {
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 0.8rem;
} */
</style>