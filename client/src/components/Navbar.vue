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
        <b-navbar-item tag="router-link" to="/my-posts" v-if="isSignedIn">
          My posts
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <router-link :to="'profile/' + userID" class="navbar__nickname">{{
            username
          }}</router-link>
          <div class="buttons">
            <button
              class="button is-primary"
              v-if="isSignedIn === false"
              @click="isSignUpModalActive = true"
            >
              <strong>Sign up</strong>
            </button>
            <button
              class="button is-light"
              v-if="isSignedIn === false"
              @click="isSignInModalActive = true"
            >
              Sign in
            </button>
            <button
              class="button is-light"
              v-if="isSignedIn === true"
              @click="signOut"
            >
              Sign out
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
    <b-loading :active.sync="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SignUpForm from "@/components/SignUpForm";
import SignInForm from "@/components/SignInForm";

export default {
  components: {
    SignUpForm,
    SignInForm
  },
  data() {
    return {
      isSignUpModalActive: false,
      isSignInModalActive: false,
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(["isSignedIn", "userID", "username"])
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    }
  }
};
</script>

<style lang="scss">
.navbar__nickname {
  margin-right: 1rem;

  @media screen and (max-width: 1024px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
