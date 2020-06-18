import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./service/axios";

import Buefy from "buefy";

import "normalize.css";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
