<template>
  <view-post :body="getSinglePost" />
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import ViewPost from "../../components/PostV2/ViewPost.vue";

export default {
  components: {
    ViewPost,
  },
  setup() {
    const store = useStore();
    const getSinglePost = computed(() => store.getters["posts/getSinglePost"]);
    return { getSinglePost };
  },
};
</script>

<style>
</style>