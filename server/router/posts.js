const router = require("express").Router();
const { check } = require("express-validator");

const postsController = require("../controllers/posts");

// GET /posts
router.get("/", postsController.getAllPosts);

// POST /posts
router.post(
  "/",
  [check("title").isLength({ min: 1 }), check("content").isLength({ min: 10 })],
  postsController.createPost
);

// GET /posts/:id
router.get("/:postID", postsController.getPost);

// PUT /posts/:id
router.put(
  "/:postID",
  [check("title").isLength({ min: 1 }), check("content").isLength({ min: 10 })],
  postsController.editPost
);

// DELETE /posts/:id
router.delete("/:postID", postsController.deletePost);

module.exports = router;
