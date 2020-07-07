import User from "../models/user";

import { Request, Response, NextFunction } from "express";
import { BetterError } from "../types/types";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      const error: BetterError = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    res.json({ username: user.name, email: user.email, avatar: user.avatar });
  } catch (err) {
    next(err);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const name = req.body.username;
  const email = req.body.email;

  try {
    let user;
    if (req.file) {
      const fullUrl = req.protocol + "://" + req.get("host");
      const filePath = fullUrl + "/images/" + req.file.filename;
      user = await User.findByIdAndUpdate(id, {
        name,
        email,
        avatar: filePath,
      });
    } else {
      user = await User.findByIdAndUpdate(id, {
        name,
        email,
      });
    }

    if (!user) {
      const error: BetterError = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "User updated successfully!",
      user,
    });
  } catch (err) {
    next(err);
  }
};
