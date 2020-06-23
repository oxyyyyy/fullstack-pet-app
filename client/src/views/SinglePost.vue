<template>
  <div>
    <article class="post">
      <h2 class="postCard__title title">{{ post.title }}</h2>
      <p class="postCard__content">{{ post.content }}</p>
      <p class="postCard__author">
        <span class="has-text-weight-semibold">Author:</span>
        {{ post.author.name }}
      </p>
      <p class="postCard__timestamp">
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
        v-if="$store.state.isSignedIn && isAuthor"
      >
        Edit
      </b-button>
      <b-button
        type="is-danger"
        @click="deleteCurrentPost"
        v-if="$store.state.isSignedIn && isAuthor"
      >
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
      post: {
        author: ""
      },
      isAuthor: false,
      isLoading: false
    };
  },
  methods: {
    deleteCurrentPost() {
      this.isLoading = true;
      axios
        .delete(`/posts/${this.$route.params.id}`, {
          headers: { Authorization: this.$store.state.jwtToken }
        })
        .then(() => {
          this.$buefy.toast.open({
            message: "Post was deleted",
            position: "is-bottom",
            type: "is-success"
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: `Something went wrong`,
            position: "is-bottom",
            type: "is-danger"
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.isLoading = true;
    axios
      .get(`/posts/${this.$route.params.id}`)
      .then(response => {
        this.post = response.data;
        this.post.timestamp = new Date(this.post.createdAt);
        this.post.timestamp = `${this.post.timestamp.getDate()}/${this.post.timestamp.getMonth()}/${this.post.timestamp.getFullYear()} at ${this.post.timestamp.getHours()}:${this.post.timestamp.getMinutes()}`;
        this.isAuthor =
          response.data.author._id === this.$store.state.userID ? true : false;
      })
      .catch(() => {
        this.$buefy.toast.open({
          message: `Something went wrong`,
          position: "is-bottom",
          type: "is-danger"
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>

<style lang="scss">
.post-controls {
  display: flex;
  padding-top: 2rem;
}

.postCard__author {
  margin-top: 3rem;
}

.post-controls__edit-btn {
  margin-right: 1rem;
}
</style>
