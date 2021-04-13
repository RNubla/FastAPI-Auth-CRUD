<template>
  <post :title="getSingPost.title" />
</template>

<script>
import { mapGetters } from "vuex";
import Post from "../components/Post/Post";
export default {
  components: {
    Post,
  },
  computed: {
    ...mapGetters("posts", {
      getSingPost: "getSinglePost",
    }),
  },
};
</script>

<style>
</style>