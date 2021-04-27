<template>
  <div class="">
    <div class="hero">
      <div v-for="box in carousel" :key="box" class="">
        <img :src="box.img" class="" />
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

<style lang="scss" scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 1em;
}
div > img {
  display: flex;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
p {
  position: relative;
  bottom: 50%;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  font-size: 1.9rem;
}
</style>>
