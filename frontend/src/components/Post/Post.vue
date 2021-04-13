<template>
  <div>{{ title }}</div>
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