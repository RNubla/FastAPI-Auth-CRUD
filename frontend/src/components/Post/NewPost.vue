<template>
  <div class="felx flex-col justify-between">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <div>
      <h1 class="font-bold text-2xl">Create a New Post</h1>
    </div>

    
    <!--editorjs id-->
    <div class id="codex-editor" />
    
    <div type='button' @click="submitPost" class="fixed h-16 w-full bottom-0 bg-green-400 hover:bg-green-500 flex items-center justify-center z-10">
      <div class="text-2xl font-bold">
        Post
      </div>
    </div>
    <!-- <div class="editorx_body">
      <pre>{{ inputPost.data }}</pre>
    </div> -->
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import SimpleImage from "simple-image-editorjs";
import { StyleInlineTool } from "editorjs-style";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      errors: [],
      inputPost: {
        // title: null,
        data: null,
        // post_img: "string",
        published_on: new Date(),
      },
      value: null,
      window: Object,
    };
  },
  computed: {
    getInput() {
      return this.inputPost.data;
    },
  },
  methods: {
    ...mapActions("posts", {
      addPost: "addPost",
    }),
    async submitPost() {
      console.log("SAVING");
      await this.save();
      this.errors = [];
      // if (!this.inputPost.title) {
      //   this.errors.push("Title required.");
      // }
      // if (!this.inputPost.body) {
      //   this.errors.push("Body required.");
      // }
      if (this.errors.length === 0) {
        // console.log("Error is empty");
        // console.log(this.inputPost);
        await this.addPost(this.inputPost);
        this.inputPost.title = null;
        this.inputPost.body = null;
        this.$router.push({
          name: "Home",
        });
      }
    },
    save: async function () {
      await this.window.editor.save().then((savedData) => {
        console.log(savedData);
        this.value = savedData;
        this.inputPost.data = this.value;
      });
    },
    myEditor: function () {
      this.window.editor = new EditorJS({
        readOnly: false,
        holder: "codex-editor",
        placeholder: "Let`s write an awesome story!",
        autofocus: true,
        inlineToolbar: true,
        /**
         * This Tool will be used as default
         */
        defaultBlock: "paragraph",
        tools: {
          style: {
            class: StyleInlineTool,
          },
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
          // header: {
          //   class: Header,
          //   shortcut: "CTRL+SHIFT+H",
          // },
          // list: {
          //   class: List,
          // },
          // paragraph: {
          //   class: Paragraph,
          //   config: {
          //     placeholder: ".",
          //   },
          // },
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
    this.myEditor();
  },
};
</script>
