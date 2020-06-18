<template>
  <router-link :to="'/posts/' + id" class="postCard box">
    <h2 class="postCard__title title">{{ title }}</h2>
    <p class="postCard__content">{{ content | truncate }}</p>
    <p class="postCard__author">
      <span class="has-text-weight-semibold">Author:</span> {{ author }}
    </p>
    <p class="postCard__timestamp">
      <span class="has-text-weight-semibold">Created:</span>
      {{ timestamp.getDate() }}/{{ timestamp.getMonth() }}/{{
        timestamp.getFullYear()
      }}
      at {{ timestamp.getHours() }}:{{ timestamp.getMinutes() }}
    </p>
  </router-link>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  filters: {
    truncate(input) {
      if (input.length > 250) return input.substring(0, 300) + "...";
      else return input;
    },
  },
};
</script>

<style lang="scss">
.postCard__author {
  margin-top: 1.5rem;
}

h2.postCard__title:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
