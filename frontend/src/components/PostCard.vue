<template>
  <div>
    <!-- component -->
    <div class="px-10 my-4 py-6 rounded shadow-xl bg-white w-4/5 mx-auto">
      <div class="flex justify-between items-center">
        <!-- <span class="font-light text-gray-600">March 28, 2021</span> -->
        <span class="font-light text-gray-600">{{ formatedDate }}</span>
        <!-- <a
          class="px-2 py-1 bg-blue-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
          >Announcement</a
        > -->
      </div>
      <div class="mt-2">
        <a
          class="text-2xl text-gray-700 font-bold hover:text-gray-600"
          href="#"
        >
          {{ title }}
        </a>
        <p class="mt-2 text-gray-600">
          <!-- Ille enim occurrentia nescio quae comminiscebatur; Eadem nunc mea
          adversum te oratio est. Sit sane ista voluptas. Omnes enim iucundum
          motum, quo sensus hilaretur. -->
          <slot></slot>
        </p>
      </div>
      <div class="flex justify-between items-center mt-4">
        <a class="text-blue-600 hover:underline" href="#">Visit Article</a>
        <a class="px-2 py-1" href=""> {{ author }}</a>
      </div>
      <div class="flex justify-between items-center mt-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    body: String,
    author: String,
    published_on: String,
  },
  data() {
    return {
      formatedDate: null,
    };
  },
  methods: {
    convertDate() {
      let date = new Date(this.published_on);
      //   console.log(date.toDateString());
      this.formatedDate = date.toDateString();
      //   return date;
    },
  },
  created() {
    this.convertDate();
  },
};
</script>

<style></style>
