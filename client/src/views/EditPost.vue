<template>
  <div class="page">
    <form @submit.prevent="submitForm">
      <b-field label="Title">
        <b-input v-model="form.title"></b-input>
      </b-field>
      <b-field label="Content">
        <b-input
          maxlength="5000"
          type="textarea"
          v-model="form.content"
        ></b-input>
      </b-field>
      <button class="button is-primary">Submit</button>
    </form>
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "EditPost",
  data() {
    return {
      form: {
        title: "",
        content: ""
      },
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(["jwtToken"])
  },
  methods: {
    submitForm() {
      if (this.form.title && this.form.content) {
        this.isLoading = true;
        axios
          .put(
            `/posts/${this.$route.params.id}`,
            {
              title: this.form.title,
              content: this.form.content
            },
            { headers: { Authorization: this.jwtToken } }
          )
          .then(() => {
            this.$buefy.toast.open({
              message: "Post was edited",
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
    }
  },
  mounted() {
    this.isLoading = true;
    axios
      .get(`/posts/${this.$route.params.id}`)
      .then(response => {
        this.form = response.data;
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

<style></style>
