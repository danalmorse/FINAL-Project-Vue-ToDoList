<template>
  <div id="app">
    <h3>You are seeing the current date below</h3>
    <p>{{ currentDate() }}</p>
  </div>
</template>

<script>
export default {
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
    },
  },
};
</script>

<style scoped></style>
