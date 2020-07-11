<template>
  <form @submit.prevent="signIn">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign In</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
            type="email"
            v-model="signInForm.email"
            placeholder="Your email"
            autocomplete="email"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Password">
          <b-input
            type="password"
            v-model="signInForm.password"
            password-reveal
            placeholder="Your password"
            autocomplete="password"
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
        <button class="button is-primary">Sign In</button>
      </footer>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignInForm",
  data() {
    return {
      signInForm: {
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  methods: {
    signIn() {
      if (this.signInForm.email && this.signInForm.password) {
        this.isLoading = true;
        axios
          .post("/auth/signin", {
            email: this.signInForm.email,
            password: this.signInForm.password
          })
          .then(response => {
            if (response.status === 200) {
              this.$buefy.toast.open({
                message: "Sign In success",
                position: "is-bottom",
                type: "is-success"
              });
              for (let field in this.signInForm) {
                this.signInForm[field] = "";
              }
              console.log(response);
              this.$store.dispatch("signIn", {
                token: response.data.token,
                userID: response.data.id,
                jwtToken: response.data.token,
                username: response.data.username
              });
              this.$parent.close();
            }
          })
          .catch(error => {
            if (error.response) {
              if (error.response.status === 401) {
                this.$buefy.toast.open({
                  message: "Wrong credentials",
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
