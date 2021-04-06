<template>
  <div class="">
    <form id="app" @submit.prevent="submitPost" method="post">
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
      <p>
        <label>Title</label>
        <input type="text" v-model="inputPost.title" />
      </p>

      <p>
        <label>Body</label>
        <textarea type="text" v-model="inputPost.body" />
      </p>

      <p>
        <input type="submit" value="Submit Post" />
      </p>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      errors: [],
      //   inputPost: {
      //     title: null,
      //     body: null,
      //     post_img: "string",
      //     published_on: null,
      //   },
    };
  },
  computed: {
    ...mapState({
      inputPost: "inputPost",
    }),
  },
  methods: {
    ...mapActions({
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
        this.addPost();
        this.inputPost.title = null;
        this.inputPost.body = null;
      }
    },
  },
};
</script>

<style>
</style>