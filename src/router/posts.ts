import { Router } from "express";
import { check } from "express-validator";

import authMiddleware from "./../middleware/auth";

import {
  getAllPosts,
  createPost,
  getMyPosts,
  getPost,
  editPost,
  deletePost,
} from "./../controllers/posts";

const router = Router();

// * GET /posts
router.get("/", getAllPosts);

// * POST /posts
router.post(
  "/",
  authMiddleware,
  [check("title").isLength({ min: 1 }), check("content").isLength({ min: 10 })],
  createPost
);

// * GET /my-posts
router.get("/my-posts", authMiddleware, getMyPosts);

// * GET /posts/:id
router.get("/:postID", getPost);

// * PUT /posts/:id
router.put(
  "/:postID",
  authMiddleware,
  [check("title").isLength({ min: 1 }), check("content").isLength({ min: 10 })],
  editPost
);

// * DELETE /posts/:id
router.delete("/:postID", authMiddleware, deletePost);

export default router;
