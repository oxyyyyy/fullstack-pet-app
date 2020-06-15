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
// import axios from "axios";

export default {
  name: "SignInForm",
  data() {
    return {
      signInForm: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    signUp() {
      if (this.signUpForm.email && this.signUpForm.password) {
        console.log();
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Please fill the form`,
          position: "is-bottom",
          type: "is-danger",
        });
      }
    },
  },
};
</script>

<style></style>
