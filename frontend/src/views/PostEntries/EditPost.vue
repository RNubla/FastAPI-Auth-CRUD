<template>
  <!-- <edit-post /> -->
  <edit-post-v-2 :data="getSinglePost.data" />
</template>

<script>
// import EditPost from "../components/Post/EditPost";
import EditPostV2 from "../../components/Post/EditPost-v2";
import { mapGetters } from "vuex";
export default {
  components: {
    // EditPost,
    EditPostV2,
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