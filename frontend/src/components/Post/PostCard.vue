<template>
  <div>
    <!-- component -->
    <div
      class="px-10 md:px-3 my-4 py-6 rounded shadow-xl bg-white w-4/5 mx-auto min-h-full"
    >
      <div class="flex md:justify-center">
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
        <p class="mt-2 text-gray-600 overflow-hidden h-6">
          <!-- Ille enim occurrentia nescio quae comminiscebatur; Eadem nunc mea
          adversum te oratio est. Sit sane ista voluptas. Omnes enim iucundum
          motum, quo sensus hilaretur. -->
          <slot></slot>
        </p>
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
import { mapActions } from "vuex";
export default {
  props: {
    title: String,
    body: String,
    author: String,
    published_on: String,
    post_id: String,
  },
  data() {
    return {
      formatedDate: null,
    };
  },
  methods: {
    ...mapActions("posts", {
      getASinglePost: "getAPost",
    }),
    viewSinglePost() {
      this.getASinglePost(this.post_id);
      this.$router.push({
        name: "post",
        params: { title: this.title },
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
