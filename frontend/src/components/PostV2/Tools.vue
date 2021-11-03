<template>
  <div class="container">
    <div class="grid" v-if="editor">
      <button
        class="ri-bold"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      ></button>
      <button
        class="ri-italic"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      ></button>
      <button
        class="ri-strikethrough"
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      ></button>
      <button
        class="ri-code-line"
        @click="editor.chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      ></button>
      <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </button>
      <button @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </button> -->
      <button
        class="ri-h-1"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      ></button>
      <button
        class="ri-h-2"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      ></button>
      <button
        class="ri-h-3"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      ></button>
      <button
        class="ri-h-4"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      ></button>
      <button
        class="ri-h-5"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      ></button>
      <button
        class="ri-h-6"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      ></button>
      <button
        class="ri-list-unordered"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      ></button>
      <button
        class="ri-list-ordered"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      ></button>
      <button
        class="ri-braces-line"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      ></button>
      <button
        class="ri-double-quotes-l"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      ></button>
      <button
        class="ri-separator"
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <!-- horizontal rule -->
      </button>
      <!-- <button @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </button> -->
      <button
        class="ri-arrow-go-back-line"
        @click="editor.chain().focus().undo().run()"
      ></button>
      <button
        class="ri-arrow-go-forward-line"
        @click="editor.chain().focus().redo().run()"
      ></button>
      <button
        class="ri-align-left"
        @click="editor.chain().focus().setTextAlign('left').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
      ></button>
      <button
        class="ri-align-center"
        @click="editor.chain().focus().setTextAlign('center').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      ></button>
      <button
        class="ri-align-right"
        @click="editor.chain().focus().setTextAlign('right').run()"
        :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      ></button>
      <button
        class="ri-paragraph"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      ></button>
      <button class="ri-image-add-fill" @click="addImage"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editor: null,
  },
  methods: {
    addImage() {
      const url = window.prompt("URL");
      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },
};
</script>
<style scoped>
button {
  background-color: white;
  /* border: none; */
  /* border-color: hsl(210, 2%, 56%); */
  align-items: center;
}
.is-active {
  background-color: hsl(0, 0%, 27%);
  color: white;
}
</style>