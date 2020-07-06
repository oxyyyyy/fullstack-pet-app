import Vue from "vue";
import Vuex from "vuex";

import AuthModule from "@/store/modules/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    AuthModule
  }
});
