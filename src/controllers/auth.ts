import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as passport from "passport";

import User from "../models/user";

import { Request, Response, NextFunction } from "express";

import { BetterError } from "../types/types";

const saltRounds = 10;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: BetterError = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email,
      password: hash,
      name,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User was created", userID: savedUser._id });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};
