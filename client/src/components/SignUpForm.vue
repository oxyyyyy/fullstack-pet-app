<template>
  <form @submit.prevent="signUp">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign Up</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
            type="email"
            v-model="signUpForm.email"
            autocomplete="email"
            placeholder="Your email"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Name">
          <b-input
            type="text"
            v-model="signUpForm.name"
            autocomplete="nickname"
            placeholder="Your name"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            v-model="signUpForm.password"
            password-reveal
            autocomplete="new-password"
            placeholder="Your password"
            required
            minlength="6"
          >
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary">Sign Up</button>
      </footer>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUpForm",
  data() {
    return {
      signUpForm: {
        email: "",
        password: "",
        name: ""
      },
      isLoading: false
    };
  },
  methods: {
    signUp() {
      if (
        this.signUpForm.email &&
        this.signUpForm.password &&
        this.signUpForm.name
      ) {
        this.isLoading = true;
        axios
          .post("/auth/signup", {
            email: this.signUpForm.email,
            password: this.signUpForm.password,
            name: this.signUpForm.name
          })
          .then(() => {
            this.$parent.close();
            this.$buefy.toast.open({
              message: "Sign Up success",
              position: "is-bottom",
              type: "is-success"
            });
            for (let field in this.signUpForm) {
              this.signUpForm[field] = "";
            }
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 422) {
                error.response.data.data.forEach(data => {
                  this.$buefy.toast.open({
                    message: data.msg,
                    position: "is-bottom",
                    type: "is-danger"
                  });
                });
                return;
              }
            }
            this.$buefy.toast.open({
              message: `Something went wrong`,
              position: "is-bottom",
              type: "is-danger"
            });
            console.error(new Error(error));
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

<style></style>
