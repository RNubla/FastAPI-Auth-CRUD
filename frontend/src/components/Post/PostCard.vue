<template>
  <div>
    <!-- component -->
    <div
      class="px-10 md:px-3 my-4 py-6 rounded shadow-xl bg-white w-4/5 mx-auto min-h-full"
    >
      <div class="flex md:justify-center">
        <span @click="editPost" v-if="getUserId === user_id">Edit</span>
        <!-- <span class="font-light text-gray-600">March 28, 2021</span> -->
        <span class="font-light text-gray-600">{{ formatedDate }}</span>
        <!-- <a
          class="px-2 py-1 bg-blue-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
          >Announcement</a
        > -->
      </div>
      <div class="mt-2">
        <a class="text-md text-gray-700 font-bold hover:text-gray-600" href="#">
          {{ title }}
        </a>
        <p class="mt-2 text-gray-600 overflow-hidden h-6"></p>
      </div>
      <div
        class="flex justify-between md:justify-center items-center mt-4 md:grid md:auto-rows-max md:items-center"
      >
        <button
          @click.prevent="viewSinglePost"
          class="text-blue-600 hover:underline"
          href="#"
        >
          Visit Article
        </button>
        <a class="px-2 py-1" href=""> {{ author }}</a>
      </div>
      <!-- <div class="flex justify-between items-center mt-4"></div> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    title: String,
    // body: String,
    author: String,
    published_on: String,
    post_id: String,
    user_id: String,
  },
  data() {
    return {
      formatedDate: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      getUserId: "getUserId",
    }),
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
  },
  created() {
    this.convertDate();
  },
};
</script>

<style></style>
