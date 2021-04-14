<template>
  <div class="flex flex-col justify-between">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
  <div>
      <h1 class="font-bold text-2xl">Editing Post</h1>
    </div>

    
    <!--editorjs id-->
    <div class="" id="editPost" />
    
    <!-- Fixed to the bottom of the webpage -->
    <div @click="submitEditPost" type='button' class="fixed h-16 w-full bottom-0 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center z-10 ">
      <div
      class="text-2xl font-bold"
      >
        Update
      </div>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
// import SimpleImage from "@editorjs/simple-image";
import SimpleImage from "simple-image-editorjs";
import { mapActions, mapGetters } from "vuex";
import { StyleInlineTool } from "editorjs-style";

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
        await this.$router.push({
          name: "Home",
          // params: { id: this.getSinglePost.id },
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
          style: StyleInlineTool,
          image: {
            class: SimpleImage,
            inlineToolbar: true,
          },
          // inlineToolbar: true,
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