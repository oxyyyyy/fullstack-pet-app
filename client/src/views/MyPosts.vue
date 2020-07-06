<template>
  <div class="page">
    <section class="posts">
      <header class="posts__header">
        <h1 class="title">My Posts:</h1>
        <div class="posts__controls">
          <b-select
            class="posts__sort-select"
            placeholder="Sort by"
            v-model="selectedSortBy"
            @input="sortByChange"
          >
            <option
              v-for="option in sortByVariants"
              :value="option.id"
              :key="option.id"
            >
              {{ option.label }}
            </option>
          </b-select>
        </div>
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
import { mapGetters } from "vuex";

import PostCard from "@/components/PostCard.vue";

export default {
  name: "MyPosts",
  data() {
    return {
      posts: [],
      preloaderIsActive: true,
      selectedSortBy: "desc",
      sortByVariants: [
        {
          id: "desc",
          label: "New First"
        },
        {
          id: "asc",
          label: "Old First"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["jwtToken"])
  },
  components: {
    PostCard
  },
  methods: {
    sortByChange() {
      axios
        .get(`/posts/my-posts?sortBy=${this.selectedSortBy}`, {
          headers: { Authorization: this.jwtToken }
        })
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
  },
  mounted() {
    axios
      .get("/posts/my-posts", {
        headers: { Authorization: this.jwtToken }
      })
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
.my-posts {
  padding-top: 3rem;
}
</style>
