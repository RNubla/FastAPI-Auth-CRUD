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
      <div class id="codex-editor" />
    </div>
    <button
      style="margin-left: 30%"
      type="button"
      name="button"
      @click="submitPost"
    >
      save
    </button>
    <div class="editorx_body">
      <pre>{{ inputPost.data }}</pre>
    </div>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
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
        // this.$router.push("/");
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
          image: SimpleImage,
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

<style lang="css" scoped >
.editorx_body {
  /* width: 62%;
  margin-left: 15%; */
  width: 60%;
  margin-left: 20%;
  border: 2px solid #f1f3f5;
  box-sizing: border-box;
}
.ce-block--focused {
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 0.5438550420168067) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>