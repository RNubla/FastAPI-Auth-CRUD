<template>
  <!-- <post
    :title="getSinglePost.title"
    :body="getSinglePost.body"
    :published_on="getSinglePost.published_on"
    :author="getSinglePost.author"
  /> -->
  <post
    :author="getSinglePost.author"
    :published_on="getSinglePost.published_on"
    :data="getSinglePost.data"
  />
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../../components/Post/Post";
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