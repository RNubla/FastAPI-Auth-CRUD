<template>
  <div>
    <tools :editor="editor" />
    <editor-content :editor="editor" />
    <div type="button" @click="submitPost" class="">
      <div class="text-2xl font-bold">Submit</div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import { defaultExtensions } from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Text from "@tiptap/extension-text";
import CodeBlock from "@tiptap/extension-code-block";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import { mapActions } from "vuex";
import Tools from "./Tools.vue";

export default {
  components: {
    EditorContent,
    Tools,
  },

  data() {
    return {
      editor: null,
      json: null,
      data: null,
      inputPost: {
        data: null,
        published_on: new Date(),
      },
    };
  },

  methods: {
    ...mapActions("posts", {
      addPost: "addPost",
    }),
    addImage() {
      const url = window.prompt("URL");
      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
    async submitPost() {
      console.log("SAVING");
      this.inputPost.data = this.json;
      console.log(this.inputPost);
      await this.addPost(this.inputPost);
      this.$router.push({
        name: "Home",
      });
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        ...defaultExtensions(),
        Document,
        Paragraph,
        Text,
        TextAlign,
        CodeBlock,
        Image,
        Dropcursor,
      ],
      editorProps: {
        attributes: {
          spellchekc: "false",
        },
      },
    });
    this.json = this.editor.getJSON();
    this.editor.on("update", () => {
      this.json = this.editor.getJSON();
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
/* Basic editor styles */
.grid {
  display: grid;
  grid-template-columns: repeat(11, minmax(0, 1fr));
  grid-auto-flow: dense;
}
.ProseMirror {
  > * + * {
    // margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(hsl(0, 0%, 38%), 0.1);
    color: #616161;
  }

  pre {
    background: hsl(0, 0%, 33%);
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>