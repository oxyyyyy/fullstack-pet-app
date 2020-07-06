<template>
  <div class="page">
    <form @submit.prevent="submitForm">
      <b-field label="Title">
        <b-input v-model="form.title" required></b-input>
      </b-field>
      <b-field label="Content">
        <b-input
          minlength="10"
          maxlength="5000"
          type="textarea"
          v-model="form.content"
          required
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
  name: "CreatePost",
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
          .post(
            "/posts",
            {
              title: this.form.title,
              content: this.form.content
            },
            { headers: { Authorization: this.jwtToken } }
          )
          .then(() => {
            this.$buefy.toast.open({
              message: "Post was created",
              position: "is-bottom",
              type: "is-success"
            });
            this.$router.push("/");
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 422) {
                this.$buefy.toast.open({
                  message: `Please fill the form correctly`,
                  position: "is-bottom",
                  type: "is-danger"
                });
                return;
              }
            }
            this.$buefy.toast.open({
              message: `Something went wrong`,
              position: "is-bottom",
              type: "is-danger"
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Please fill the form`,
          position: "is-bottom",
          type: "is-danger"
        });
      }
    }
  }
};
</script>

<style lang="scss"></style>
