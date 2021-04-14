<template>
  <div>
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <div>
      <h1 style="text-align: center">This is vue editor.js</h1>
    </div>

    <div class="editorx_body">
      <!--editorjs id-->
      <div class id="editPost" />
    </div>
    <button
      style="margin-left: 30%"
      type="button"
      name="button"
      @click="submitEditPost"
    >
      save
    </button>
    <div class="editorx_body">
      <pre>{{ fetchedData }}</pre>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      errors: [],
      window: Object,
      inputEditPost: {},
    };
  },
  computed: {
    ...mapGetters("posts", {
      getSinglePost: "getSinglePost",
    }),
  },
  methods: {
    ...mapActions("posts", {
      editAPost: "editAPost",
    }),
    async submitEditPost() {
      await this.save();
      this.errors = [];
      /*  if (!this.getSinglePost.title) {
        this.errors.push("Title required.");
      }
      if (!this.getSinglePost.body) {
        this.errors.push("Body required.");
      } */
      if (this.errors.length === 0) {
        console.log("INPUT POST", this.inputEditPost);
        await this.editAPost(this.inputEditPost);
        // this.inputEditPost.title = null;
        // this.inputEditPost.body = null;
        this.$router.push({
          name: "Post",
          params: { id: this.getSinglePost.id },
        });
      }
    },
    save: async function () {
      await this.window.editor.save().then((savedData) => {
        console.log(savedData);
        this.value = savedData;
        this.inputEditPost.data = this.value;
      });
    },
    myEditor: function () {
      this.window.editor = new EditorJS({
        readOnly: false,
        holder: "editPost",
        placeholder: "Let`s write an awesome story!",
        autofocus: true,
        inlineToolbar: true,
        data: this.fetchedData.data,
        /**
         * This Tool will be used as default
         */
        defaultBlock: "paragraph",
        tools: {
          image: {
            class: SimpleImage,
            inlineToolbar: true,
          },
          // inlineToolbar: true,

          heading: {
            class: Header,
            // inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3,
            },
          },
          list: {
            class: List,
            // inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            // inlineToolbar: true,
          },
        },
        onReady: function () {
          console.log("ready");
        },
        onChange: function () {
          console.log("change");
        },
      });
    },
  },
  created: function () {
    this.fetchedData = this.getSinglePost;
    this.myEditor();
  },
};
</script>

<style>
</style>