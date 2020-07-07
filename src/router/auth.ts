import { Router } from "express";
import { check } from "express-validator";

import User from "../models/user";

import { signup, signin } from "../controllers/auth";

const router = Router();

// * POST /auth/signup
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    check("password").trim().isLength({ min: 6 }),
    check("name").trim().notEmpty(),
  ],
  signup
);

// * POST /auth/signin
router.post("/signin", signin);

export default router;
