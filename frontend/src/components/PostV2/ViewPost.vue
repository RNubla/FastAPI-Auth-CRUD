<template>
  <div>
    <div v-if="getUserId === body.user_id">
      <input type="checkbox" v-model="editable" />
      <label for="editable">Edit</label><br />
      <button v-if="getUserId === body.user_id && editable" @click="DeletePost">
        Delete Post
      </button>
      <tools
        :editor="editor"
        v-if="getUserId === body.user_id && editable"
        v-model="editable"
      />
    </div>

    <editor-content :editor="editor" />
    <div
      type="button"
      @click="submitEditPost"
      v-if="getUserId === body.user_id && editable"
    >
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
import { mapActions, mapGetters } from "vuex";
import Tools from "./Tools.vue";
export default {
  components: {
    EditorContent,
    Tools,
  },

  props: {
    body: {},
  },
  data() {
    return {
      user_id: null,
      editor: null,
      json: null,
      editable: false,
      inputPost: { data: null, published_on: new Date() },
    };
  },
  computed: {
    ...mapGetters("auth", {
      getUserId: "getUserId",
    }),
    ...mapGetters("posts", {
      getPostID: "getPostID",
    }),
  },
  watch: {
    editable() {
      this.editor.setEditable(this.editable);
    },
  },
  mounted() {
    this.editor = new Editor({
      editable: this.editable,
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
      content: this.body.data,
    });

    // Get the initial content …
    this.json = this.editor.getJSON();

    // … and get the content after every change.
    this.editor.on("update", () => {
      this.json = this.editor.getJSON();
    });
    // this.setContent();
    // this.currentUserPost();
  },

  methods: {
    ...mapActions("posts", {
      editAPost: "editAPost",
    }),
    ...mapActions("posts", {
      deleteCurrentPost: "deleteCurrentPost",
    }),
    async DeletePost() {
      // let id = this.body.id;
      // console.log("deletePost id", id);
      this.deleteCurrentPost(this.body.id);
      await this.$router.push({
        name: "Home",
      });
    },
    async submitEditPost() {
      console.log("edit post submit");
      this.inputPost.data = this.json;
      await this.editAPost(this.inputPost);
      await this.$router.push({
        name: "Home",
      });
    },
    currentUserPost() {
      console.log(this.body.user_id);
    },
    setContent() {
      // You can pass a JSON document to the editor.
      this.editor.commands.setContent(this.data, true);

      // It’s likely that you’d like to focus the Editor after most commands.
      this.editor.commands.focus();
    },

    clearContent() {
      this.editor.chain().clearContent(true).focus().run();
    },
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
/* Style the export */
.export {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }
}

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
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
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
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

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}
</style>