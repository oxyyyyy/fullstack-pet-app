<template>
  <div>
    <article class="post">
      <h2 class="postCard__title title">{{ post.title }}</h2>
      <p class="postCard__content">{{ post.content }}</p>
      <p class="postCard__timestamp is-size-5">
        <span class="has-text-weight-semibold">Created:</span>
        {{ post.timestamp }}
      </p>
    </article>
    <div class="post-controls">
      <b-button
        tag="router-link"
        type="is-info"
        class="post-controls__edit-btn"
        :to="'/edit-post/' + $route.params.id"
      >
        Edit
      </b-button>
      <b-button type="is-danger" @click="deleteCurrentPost">
        Delete
      </b-button>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SinglePost",
  data() {
    return {
      post: {},
      isLoading: false,
    };
  },
  methods: {
    deleteCurrentPost() {
      this.isLoading = true;
      axios
        .delete(`http://localhost:8081/posts/${this.$route.params.id}`)
        .then(() => {
          this.$buefy.toast.open({
            message: "Post was deleted",
            position: "is-bottom",
            type: "is-success",
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: `Something went wrong`,
            position: "is-bottom",
            type: "is-danger",
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    this.isLoading = true;
    axios
      .get(`http://localhost:8081/posts/${this.$route.params.id}`)
      .then((response) => {
        this.post = response.data;
        this.post.timestamp = new Date(this.post.createdAt);
        this.post.timestamp = `${this.post.timestamp.getDate()}/${this.post.timestamp.getMonth()}/${this.post.timestamp.getFullYear()} at ${this.post.timestamp.getHours()}:${this.post.timestamp.getMinutes()}`;
      })
      .catch(() => {
        this.$buefy.toast.open({
          message: `Something went wrong`,
          position: "is-bottom",
          type: "is-danger",
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
};
</script>

<style lang="scss">
.post-controls {
  display: flex;
  padding-top: 2rem;
}

.post-controls__edit-btn {
  margin-right: 1rem;
}
</style>
