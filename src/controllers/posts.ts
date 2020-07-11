import Post from "../models/post";
import User from "../models/user";

import { Request, Response, NextFunction } from "express";

import { req, BetterError } from "../types/types";

import { validationResult } from "express-validator";

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const getMyPosts = async (
  req: req,
  res: Response,
  next: NextFunction
) => {
  const userID: any = req.userID;
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

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.postID;

  try {
    const post = await Post.findById(id).populate("author", "name");

    if (!post) {
      const error: BetterError = new Error("Could not find post.");
      error.statusCode = 404;
      throw error;
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (
  req: req,
  res: Response,
  next: NextFunction
) => {
  const title = req.body.title;
  const content = req.body.content;
  const post: any = new Post({
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

    if (!user) {
      const error: BetterError = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

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

export const editPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      const error: BetterError = new Error("Could not find post.");
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

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.postID;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      const error: BetterError = new Error("Could not find post.");
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
