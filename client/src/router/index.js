import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import SinglePost from "../views/SinglePost.vue";
import CreatePost from "../views/CreatePost.vue";
import EditPost from "../views/EditPost.vue";

import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/posts/:id",
    name: "SinglePost",
    component: SinglePost
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost
  },
  {
    path: "/edit-post/:id",
    name: "EditPost",
    component: EditPost
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === "CreatePost" && !store.state.isSignedIn)
    next({ name: "Home" });
  if (to.name === "EditPost" && !store.state.isSignedIn) next({ name: "Home" });
  else next();
});

export default router;
