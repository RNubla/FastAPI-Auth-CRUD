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
      <span @click="editPost" v-if="getUserId === user_id">Edit</span>
      <span class="font-light text-gray-600">{{ formatedDate }}</span>
    </div>
    <button
      @click="viewSinglePost"
      class="text-md text-gray-700 font-bold hover:text-gray-600 text-lg"
    >
      {{ removeTitleTag(title) }}
    </button>
    <!-- <button
      @click.prevent="viewSinglePost"
      class="text-blue-600 hover:underline"
      href="#"
    >
      Visit Article
    </button> -->
    <p class="px-2 py-1" href="">{{ author }}</p>
    <!-- <div
      class="px-10 md:px-3 py-6 rounded shadow-xl bg-white min-w-full mx-auto"
    > -->
    <!-- <div class="flex md:justify-center"> -->
    <!-- <span @click="editPost" v-if="getUserId === user_id">Edit</span> -->
    <!-- <span class="font-light text-gray-600">March 28, 2021</span> -->
    <!-- <span class="font-light text-gray-600">{{ formatedDate }}</span> -->
    <!-- <a
          class="px-2 py-1 bg-blue-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
          >Announcement</a
        > -->
    <!-- </div> -->
    <!-- <div class="mt-2"> -->
    <!-- <button
          @click="viewSinglePost"
          class="text-md text-gray-700 font-bold hover:text-gray-600 text-lg"
        >
          {{ removeTitleTag(title) }}
        </button> -->
    <!-- <p class="mt-2 text-gray-600 overflow-hidden h-6"></p> -->
    <!-- </div> -->
    <!-- <div
        class="flex justify-between md:justify-center items-center mt-4 md:grid md:auto-rows-max md:items-center"
      > -->
    <!-- <button
          @click.prevent="viewSinglePost"
          class="text-blue-600 hover:underline"
          href="#"
        >
          Visit Article
        </button> -->
    <!-- <a class="px-2 py-1" href=""> {{ author }}</a> -->
    <!-- </div> -->
    <!-- <div class="flex justify-between items-center mt-4"></div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import jsonpath from "jsonpath";
export default {
  props: {
    title: String,
    // body: String,
    author: String,
    published_on: String,
    post_id: String,
    user_id: String,
    post_data: {},
  },
  data() {
    return {
      formatedDate: null,
      post_image: String,
      default_post_image:
        "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    };
  },
  computed: {
    ...mapGetters("auth", {
      getUserId: "getUserId",
    }),

    // formatTitle() {
    //   const og = this.title;
    //   const nr = /<editorjs-style>(.*?)<\/editorjs-style>/g.exec(og);
    //   return nr;
    // },
  },
  methods: {
    ...mapActions("posts", {
      fetchAPost: "fetchAPost",
    }),
    async viewSinglePost() {
      await this.fetchAPost(this.post_id);
      await this.$router.push({
        name: "Post",
        params: { id: this.post_id },
      });
    },
    removeTitleTag(str) {
      if (str === null || str === "") return false;
      else str = str.toString();

      // Regular expression to identify HTML tags in
      // the input string. Replacing the identified
      // HTML tag with a null string.
      return str.replace(/(<([^>]+)>)/gi, "");
    },
    /* THIS IS AN ASYNC BECAUSE WHEN 
    I CLICK ON ONE POST FOR EDITING, 
    AND THEN RETURN BACK,
    THEN CLICK ON ANOTHER POST FOR VIEWING, 
    THIS WILL SHOW ME THE RIGHT POST FOR VIEWING
    RATHER THAN SHOWING THE PREVIOUS POST I
    SELECTED */
    async editPost() {
      console.log("fetchAPost");
      await this.fetchAPost(this.post_id);
      await this.$router.push({
        name: "EditPost",
        params: { id: this.post_id },
      });
    },
    convertDate() {
      let date = new Date(this.published_on);
      //   console.log(date.toDateString());
      this.formatedDate = date.toDateString();
      //   return date;
    },
    async getFirstImage() {
      let image = await jsonpath.query(this.post_data, "$[?(@.type=='image')]");
      // console.log("json", JSON.stringify(image));
      // console.log("FIRST IMAGE", jsonpath.query(image, "$[0].data.url"));
      let firstImage = await jsonpath.query(image, "$[0].attrs.src")[0];
      // console.log("FIRST IMAGE", firstImage);
      // console.log("EMPTY IMAGE", firstImage.length === 0);
      // var exist = Boolean;
      this.post_image = firstImage;
      /* if (firstImage === 0) {
        console.log("FIRST IMAGE US EMPTY");
        // exist = false;
        this.post_image_exists = false;
      } else {
        this.post_image = firstImage;
        // this.exist = true;
        this.post_image_exists = true;
      }
      console.log(this.post_image_exists);
      return this.post_image_exists; */
    },
  },

  beforeMount() {
    this.convertDate();
    this.getFirstImage();
    // console.log("POST_DATA", this.post_data[?(@.type=='image')]);
    // console.log(
    //   "POST_DATA FROM CARD",
    //   jsonpath.query(this.post_data, "$[?(@.type=='image')]")
    // );
    // let image = jsonpath.query(this.post_data, "$[?(@.type=='image')]");
    // console.log("json", JSON.stringify(firstImage));
    // console.log("FIRST IMAGE", jsonpath.query(image, "$[0].data.url"));
    // let firstImage = jsonpath.query(image, "$[0].data.url");
    // console.log("FIRST IMAGE", firstImage);
    // console.log("EMPTY IMAGE", firstImage.length === 0);
    // if (firstImage === 0) {
    // this.post_image_exists = false;
    // } else {
    // this.post_image = firstImage;
    // this.post_image_exists = true;
    // }
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