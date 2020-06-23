const router = require("express").Router();
const { check } = require("express-validator");

const authMiddleware = require("./../middleware/auth");

const postsController = require("../controllers/posts");

// * GET /posts
router.get("/", postsController.getAllPosts);

// * POST /posts
router.post(
  "/",
  authMiddleware,
  [check("title").isLength({ min: 1 }), check("content").isLength({ min: 10 })],
  postsController.createPost
);

// * GET /my-posts
router.get("/my-posts", authMiddleware, postsController.getMyPosts);

// * GET /posts/:id
router.get("/:postID", postsController.getPost);

// * PUT /posts/:id
router.put(
  "/:postID",
  authMiddleware,
  [check("title").isLength({ min: 1 }), check("content").isLength({ min: 10 })],
  postsController.editPost
);

// * DELETE /posts/:id
router.delete("/:postID", authMiddleware, postsController.deletePost);

module.exports = router;
