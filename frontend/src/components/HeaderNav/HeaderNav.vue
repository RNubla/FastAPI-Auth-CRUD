<template>
  <div class="grid grid-flow-col">
    <div class="flex justify-start items-center">
      <div class="m-2">Website Name</div>
    </div>
    <div class="flex justify-end items-center">
      <router-link class="m-2 p-3 shadow-md hover:bg-gray-50" to="/login"
        ><p class="text-black text-center">Login</p></router-link
      >

      <router-link
        class="m-2 bg-green-300 p-3 shadow-md hover:bg-green-400"
        to="/register"
        ><p class="text-black text-center">Sign Up</p></router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>