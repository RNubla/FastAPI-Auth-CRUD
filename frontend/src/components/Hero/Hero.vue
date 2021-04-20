<template>
  <div class="sm:h-auto md:h-auto">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 h-full px-5 my-5"
    >
      <div
        v-for="box in carousel"
        :key="box"
        class="inset-0 shadow-md text-white flex items-center justify-center text-5xl"
      >
        <img
          :src="box.img"
          class="flex rounded-md items-center object-cover w-full h-44 sm:object-cover sm:h-32 md:h-full"
        />
        <p class="absolute">{{ box.title }}</p>
      </div>
    </div>
  </div>
  <div class="my-10 font-bold text-3xl mx-auto border-b-2">Recent Posts</div>
</template>

<script>
export default {
  data() {
    return {
      carousel: {
        box1: {
          title: "Welcome",
          img:
            "https://images.unsplash.com/photo-1612392062631-94dd858cba88?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        },
        box2: {
          title: "To",
          img:
            "https://images.unsplash.com/photo-1618598477738-bf2dc2c09bed?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        },
        box3: {
          title: "The",
          img:
            "https://images.unsplash.com/photo-1603468620905-8de7d86b781e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80",
        },
        box4: {
          title: "Demo",
          img:
            "https://images.unsplash.com/photo-1604964432806-254d07c11f32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        },
      },
    };
  },
};
</script>

<style>
</style>