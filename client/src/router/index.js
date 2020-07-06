import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

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

export default router;
