<template>
  <div id="codex-editor" />
</template>

<script>
// import EditorJS from "@editorjs/editorjs";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import postHelper from "../../middleware/postHelper";
export default {
  /* props: {
    author: String,
    body: String,
    title: String,
    published_on: String,
  }, */
  data() {
    return {
      window: Object(),
      editorConfig: {
        holder: "codex-editor",
        autofocus: true,
        readOnly: true,
        tools: {
          image: SimpleImage,
          list: List,
          paragraph: Paragraph,
        },
        data: this.data,
        onReady: function () {
          console.log("ready");
        },
        onChange: function () {
          console.log("change");
        },
      },
    };
  },
  props: {
    author: String,
    data: Object,
    published_on: String,
  },
  methods: {
    // async myEditor() {
    //   console.log("CREATING READONLY EDITOR");
    //   this.window.editor = await new EditorJS({
    //     holder: "readonly-post",
    //     autofocus: true,
    //     readOnly: true,
    //     tools: {
    //       image: SimpleImage,
    //       list: List,
    //       paragraph: Paragraph,
    //     },
    //     data: this.data,
    //     onReady: function () {
    //       console.log("ready");
    //     },
    //     onChange: function () {
    //       console.log("change");
    //     },
    //   });
    // },
  },
  async created() {
    // await this.myEditor();
    postHelper(this.editorConfig);
  },
};
</script>

<style>
</style>