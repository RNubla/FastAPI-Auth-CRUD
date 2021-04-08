<template>
  <div>
    <!-- component -->
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <form @submit.prevent="submitPost">
      <div class="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>

      <div
        class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <input
        v-model="inputPost.title"
          class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellcheck="false"
          placeholder="Title"
          type="text"
        />
        <textarea
        v-model="inputPost.body"
          class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellcheck="false"
          placeholder="Describe everything about this post here"
        ></textarea>
        <!-- icons -->
        <div class="icons flex text-gray-500 m-2">
          <svg
            class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <svg
            class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
          <div class="count ml-auto text-gray-400 text-xs font-semibold">
            0/300
          </div>
        </div>
        <!-- buttons -->
        <div class="buttons flex">
          <div
            class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
          >
            Cancel
          </div>
          <input
          type="submit"
          value="Post"
            class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >          
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errors: [],
      inputPost: {
        title: null,
        body: null,
        post_img: "string",
        published_on: new Date().toUTCString(),
      },
    };
  },
  computed: {
    // ...mapState({
    //   inputPost: "inputPost",
    // }),
  },
  methods: {
    ...mapActions("posts", {
      addPost: "addPost",
    }),
    submitPost() {
      this.errors = [];
      if (!this.inputPost.title) {
        this.errors.push("Title required.");
      }
      if (!this.inputPost.body) {
        this.errors.push("Body required.");
      }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        console.log(this.inputPost);
        this.addPost(this.inputPost);
        this.inputPost.title = null;
        this.inputPost.body = null;
      }
    },
  },
};
</script>

<style>
</style>