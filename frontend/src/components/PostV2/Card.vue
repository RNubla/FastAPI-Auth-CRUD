<template>
  <div class="col">
    <div class="card h-100">
      <div class="border">
        <img
          :src="post_image ? post_image : default_post_image"
          class="card-img-top img-thumbnail"
          alt="..."
          style="height: 12rem"
        />
      </div>
      <div class="card-body">
        <h5 type="" @click="viewSinglePost" class="card-title fw-bold">
          <div class="user-select-none">{{ title }}</div>
        </h5>
        <p class="card-text d-block text-truncate" style="max-width: 18rem">
          {{ paragraph }}
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted">{{ author }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import jsonpath from "jsonpath";
import { computed, onBeforeMount } from "vue";
export default {
  props: {
    title: String,
    paragraph: String,
    author: String,
    published_on: String,
    post_id: String,
    user_id: String,
    post_data: {},
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const getFirstImage = () => {
      let image = jsonpath.query(props.post_data, "$[?(@.type=='image')]");
      // console.log("json", JSON.stringify(image));
      // console.log("FIRST IMAGE", jsonpath.query(image, "$[0].data.url"));
      image = jsonpath.query(image, "$[0].attrs.src")[0];
      // console.log("first image", image);
      return image;
    };
    onBeforeMount(async () => await getFirstImage());
    var post_image = getFirstImage();
    const default_post_image =
      "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

    // VUEX functions
    const convertDate = new Date(props.published_on).toDateString();
    const getUserId = computed(() => store.getters["auth/getUserId"]);
    const fetchAPost = () => store.dispatch("posts/fetchAPost", props.post_id);

    function removeTitleTag(str) {
      if (str === null || str === "") return false;
      else str = str.toString();

      // Regular expression to identify HTML tags in
      // the input string. Replacing the identified
      // HTML tag with a null string.
      return str.replace(/(<([^>]+)>)/gi, "");
    }

    async function viewSinglePost() {
      await fetchAPost();
      await router.push({
        name: "Post",
        params: { id: props.post_id },
      });
    }

    return {
      getUserId,
      viewSinglePost,
      removeTitleTag,
      convertDate,
      post_image,
      default_post_image,
    };
  },

  methods: {
    /* THIS IS AN ASYNC BECAUSE WHEN 
    I CLICK ON ONE POST FOR EDITING, 
    AND THEN RETURN BACK,
    THEN CLICK ON ANOTHER POST FOR VIEWING, 
    THIS WILL SHOW ME THE RIGHT POST FOR VIEWING
    RATHER THAN SHOWING THE PREVIOUS POST I
    SELECTED */
    // async editPost() {
    //   console.log("fetchAPost");
    //   await this.fetchAPost(this.post_id);
    //   await this.$router.push({
    //     name: "EditPost",
    //     params: { id: this.post_id },
    //   });
    // },
  },
};
</script>

<style>
</style>