<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
      }),
    };
  },
};
</script>

<style>
</style>