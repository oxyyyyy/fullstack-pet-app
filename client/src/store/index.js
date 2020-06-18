import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignedIn: false,
  },
  mutations: {
    switchIsSignedIn(state) {
      state.isSignedIn = !state.isSignedIn;
    },
  },
  actions: {
    switchIsSignedIn(context) {
      context.commit("switchIsSignedIn");
    },
  },
  modules: {},
});
