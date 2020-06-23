<template>
  <div class="home">
    <section class="posts">
      <header class="posts__header">
        <h1 class="title">Posts:</h1>
        <b-button
          v-if="$store.state.isSignedIn"
          tag="router-link"
          to="/create-post"
          type="is-link"
          class="create-post__btn"
        >
          <strong>Create Post</strong>
        </b-button>
      </header>
      <PostCard
        v-for="item in posts"
        :key="item._id"
        :id="item._id"
        :title="item.title"
        :content="item.content"
        :author="item.author.name"
        :timestamp="new Date(item.createdAt)"
      />
      <p v-if="posts.length === 0">No posts :(</p>
      <div class="preloader" v-show="preloaderIsActive">
        <b-skeleton width="20%" :animated="true"></b-skeleton>
        <b-skeleton :animated="true" :active="preloaderIsActive"></b-skeleton>
        <b-skeleton width="20%" :animated="true"></b-skeleton>
        <b-skeleton :animated="true" :active="preloaderIsActive"></b-skeleton>
        <b-skeleton width="20%" :animated="true"></b-skeleton>
        <b-skeleton :animated="true" :active="preloaderIsActive"></b-skeleton>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

import PostCard from "@/components/PostCard.vue";

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      preloaderIsActive: true
    };
  },
  components: {
    PostCard
  },
  mounted() {
    axios
      .get("/posts")
      .then(response => {
        this.posts = response.data;
      })
      .catch(err => {
        this.$buefy.toast.open({
          message: `Something went wrong`,
          position: "is-bottom",
          type: "is-danger"
        });
        console.error(err);
      })
      .finally(() => {
        this.preloaderIsActive = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 3rem;
}

.posts__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}
</style>
