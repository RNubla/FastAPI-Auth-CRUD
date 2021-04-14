<template>
  <div>
    <div id="codex-editor" />
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
export default {
  /* props: {
    author: String,
    body: String,
    title: String,
    published_on: String,
  }, */
  data() {
    return {
      window: Object,
    };
  },
  props: {
    author: String,
    data: Object,
    published_on: String,
  },
  methods: {
    async myEditor() {
      this.window.editor = new EditorJS(
        await {
          holder: "codex-editor",
          autofocus: true,
          readOnly: true,
          tools: {
            image: SimpleImage,
            list: List,
            paragraph: Paragraph,
          },
          data: this.data,
        }
      );
    },
  },
  async mounted() {
    await this.myEditor();
  },
};
</script>

<style>
</style>