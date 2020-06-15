const Post = require("../models/post");
const { validationResult } = require("express-validator");

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ updatedAt: "desc" })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const id = req.params.postID;
  Post.findById(id)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.json(post);
    })
    .catch((err) => {
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title,
    content,
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  post
    .save()
    .then((post) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.editPost = (req, res, next) => {
  const id = req.params.postID;
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Post.findByIdAndUpdate(id, { title, content })
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Post updated successfully!",
        post: post,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const id = req.params.postID;
  Post.findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Post removed successfully!",
        post: post,
      });
    })
    .catch((err) => {
      next(err);
    });
};
