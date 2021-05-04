<template>
  <div class="container-fluid">
    <div class="jumbotron">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">
        This is a simple CRUD application written in VueJS for the front-end and
        FastAPI(Python) for the backend. Users can register and post articles
        once they have logged in. The authentication for this application uses
        FastAPI-JWT-Auth which allows the server to send the user an access
        token and a refresh token.
      </p>
      <hr class="my-4" />
      <p>Source code is linked below if you want to dabble with it.</p>
      <p class="lead">
        <a
          class="btn btn-success btn-lg"
          href="https://github.com/RNubla/FastAPI-Auth-CRUD"
          role="button"
          >Source Code</a
        >
      </p>
    </div>
  </div>
  <!-- <div class="container">
    <div class="hero">
      <div v-for="box in carousel" :key="box" class="">
        <img :src="box.img" class="" />
        <p class="absolute">{{ box.title }}</p>
      </div>
    </div>
  </div> -->
  <div class="fw-bold fs-2">Posts</div>
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
.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}
// .container {
//   padding: 1.5em;
//   box-shadow: inset 0 0 20px hsl(0, 1%, 85%);
//   border-radius: 1em;
//   margin: 0 0 1em 0;
// }
// .hero {
//   display: grid;
//   grid-template-columns: repeat(4, minmax(0, 1fr));
//   column-gap: 1em;
//   // margin: 0 0 2em 0;
// }
// div > img {
//   display: flex;
//   object-fit: cover;
//   width: 100%;
//   height: 100%;
//   border-radius: 0.5em;
// }
// .post {
//   font-weight: bold;
//   font-size: 1.5rem;
//   // margin: 1rem 0 2rem 0;
//   // border-bottom: 0.1em dotted;
// }
// p {
//   position: relative;
//   bottom: 50%;
//   color: white;
//   font-family: "Courier New", Courier, monospace;
//   font-weight: bold;
//   font-size: 1.9rem;
// }
</style>>
