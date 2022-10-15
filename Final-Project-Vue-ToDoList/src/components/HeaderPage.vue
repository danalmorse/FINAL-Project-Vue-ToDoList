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

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid pt-5">
      <a class="navbar-brand" href="#">Day to Day Task App {{ currentDate() }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link" href="#">About Us</a>
          <a class="nav-link" href="#">Collaborators</a>
          <a class="nav-link" href="#">Sign In</a>
          <a class="nav-link" href="#">Sign Up</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
