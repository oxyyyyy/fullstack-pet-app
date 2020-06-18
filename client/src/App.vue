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
    Navbar,
  },
};
</script>

<style lang="scss">
.view {
  padding-top: 3rem;
}
</style>
