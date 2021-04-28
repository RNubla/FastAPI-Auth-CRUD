<template>
  <!-- <post
    :title="getSinglePost.title"
    :body="getSinglePost.body"
    :published_on="getSinglePost.published_on"
    :author="getSinglePost.author"
  /> -->
  <!-- <post
    :author="getSinglePost.author"
    :published_on="getSinglePost.published_on"
    :data="getSinglePost.data"
  /> -->
  <post :body="getSinglePost" />
</template>

<script>
import { mapGetters } from "vuex";
// import Post from "../../components/Post/Post.vue";
// import Post from "../../components/Post/Post";
import Post from "../../components/PostV2/ViewPost";
export default {
  components: {
    Post,
  },
  computed: {
    ...mapGetters("posts", {
      getSinglePost: "getSinglePost",
    }),
  },
};
</script>

<style>
</style>