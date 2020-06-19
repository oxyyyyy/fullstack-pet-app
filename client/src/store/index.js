import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignedIn: localStorage.getItem("jwt_token") ? true : false,
    userID: localStorage.getItem("userID"),
    jwtToken: localStorage.getItem("jwt_token")
      ? "Bearer " + localStorage.getItem("jwt_token")
      : "",
  },
  mutations: {
    signIn(state, payload) {
      state.isSignedIn = true;
      state.userID = payload.userID;
      state.jwtToken = "Bearer " + payload.jwtToken;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.userID = "";
    },
  },
  actions: {
    signIn(context, payload) {
      localStorage.setItem("jwt_token", payload.token);
      localStorage.setItem("userID", payload.userID);
      context.commit("signIn", payload);
      router.go();
    },
    signOut(context) {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("userID");
      context.commit("signOut");
      router.go();
    },
  },
  modules: {},
});
