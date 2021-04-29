<template>
  <div class="cardGridLayout">
    <!-- image -->
    <img
      :src="post_image ? post_image : default_post_image"
      alt=""
      srcset=""
      class="postCardThumb"
    />
    <!-- component -->
    <div class="">
      <span class="font-light text-gray-600">{{ convertDate }}</span>
    </div>
    <button
      @click="viewSinglePost"
      class="text-md text-gray-700 font-bold hover:text-gray-600 text-lg"
    >
      {{ removeTitleTag(title) }}
    </button>
    <p class="px-2 py-1" href="">{{ author }}</p>
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

<style scoped>
.container {
  width: 100%;
}
button {
  background-color: white;
  border: none;
  font-weight: bold;
  font-size: 1em;
}
div > img {
  /* display: flex; */
  object-fit: cover;
  /* position: relative; */
  width: 100%;
  height: 100%;
  /* border-radius: 0.5em; */
}
.cardGridLayout {
  /* width: 100%; */
  border-radius: 0.5em;
  box-shadow: 5px 5px 10px hsl(0, 1%, 85%);
  /* border-color: hsl(150, 2.33%, 16.86%); */
  display: grid;
  /* grid-template-rows: 100% repeat(4, minmax(0, 2em)); */
  grid-template-rows: 12em repeat(4, minmax(0, 2em));
  grid-gap: 0.5rem;
}
</style>>