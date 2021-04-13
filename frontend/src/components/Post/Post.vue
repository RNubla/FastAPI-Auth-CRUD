<template>
  <div>{{ title }}</div>
  <div>{{ body }}</div>
  <div>{{ published_on }}</div>
</template>

<script>
export default {
  props: {
    author: String,
    body: String,
    title: String,
    published_on: String,
  },
};
</script>

<style>
</style>