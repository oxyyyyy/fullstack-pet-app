import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

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
    component: () => import(`@/views/SinglePost.vue`)
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: () => import(`@/views/CreatePost.vue`)
  },
  {
    path: "/edit-post/:id",
    name: "EditPost",
    component: () => import(`@/views/EditPost.vue`)
  },
  {
    path: "/my-posts",
    name: "MyPosts",
    component: () => import(`@/views/MyPosts.vue`)
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () => import(`@/views/Profile.vue`)
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
  if (to.name === "MyPosts" && !store.state.isSignedIn) next({ name: "Home" });
  else next();
});

export default router;
