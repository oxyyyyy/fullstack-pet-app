<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" to="/">
          Home
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <button
              class="button is-primary"
              v-if="$store.state.isSignedIn === false"
              @click="isSignUpModalActive = true"
            >
              <strong>Sign up</strong>
            </button>
            <button
              class="button is-light"
              v-if="$store.state.isSignedIn === false"
              @click="isSignInModalActive = true"
            >
              Log in
            </button>
            <button
              class="button is-light"
              v-if="$store.state.isSignedIn === true"
              @click="signOut"
            >
              Log out
            </button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-modal
      :active.sync="isSignUpModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <SignUpForm></SignUpForm>
    </b-modal>
    <b-modal
      :active.sync="isSignInModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <SignInForm></SignInForm>
    </b-modal>
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm";
import SignInForm from "@/components/SignInForm";

export default {
  components: {
    SignUpForm,
    SignInForm,
  },
  data() {
    return {
      isSignUpModalActive: false,
      isSignInModalActive: false,
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem("jwt_token");
      this.$store.dispatch("switchIsSignedIn");
    },
  },
};
</script>

<style lang="scss"></style>
