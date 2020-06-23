<template>
  <div id="app">
    <Navbar />
    <router-view class="view container" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
.view {
  padding-top: 3rem;
}

.container {
  padding: 0 15px;
}

.page {
  padding-top: 3rem;
}

.posts__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 1rem;
}

h1.posts__header-title,
h1.posts__header-title:not(:last-child) {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>
