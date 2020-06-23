const Post = require("../models/post");
const User = require("../models/user");

const { validationResult } = require("express-validator");

exports.getAllPosts = async (req, res, next) => {
  const sortBy = req.query.sortBy;
  try {
    const posts = await Post.find()
      .sort({ updatedAt: sortBy || "desc" })
      .populate("author", "name");

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getMyPosts = async (req, res, next) => {
  const userID = req.userID;
  const sortBy = req.query.sortBy;
  try {
    const posts = await Post.find({ author: userID })
      .sort({ updatedAt: sortBy || "desc" })
      .populate("author", "name");

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const id = req.params.postID;

  try {
    const post = await Post.findById(id).populate("author", "name");

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title,
    content,
    author: req.userID,
  });
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const savedPost = await post.save();
    const user = await User.findById(req.userID);
    user.posts.push(post);
    user.save();
    res.status(201).json({
      message: "Post created successfully!",
      post: savedPost,
    });
  } catch (err) {
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  const id = req.params.postID;
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findByIdAndUpdate(id, { title, content });

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Post updated successfully!",
      post: post,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const id = req.params.postID;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      const error = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Post removed successfully!",
      post: post,
    });
  } catch (err) {
    next(err);
  }
};
