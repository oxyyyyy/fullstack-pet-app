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

// TODO: Refactor auth check
// router.beforeEach((to, from, next) => {
//   if (to.name === "CreatePost" && !store.state.isSignedIn)
//     next({ name: "Home" });
//   if (to.name === "EditPost" && !store.state.isSignedIn) next({ name: "Home" });
//   if (to.name === "MyPosts" && !store.state.isSignedIn) next({ name: "Home" });
//   else next();
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
