const router = require("express").Router();
const { check } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

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
  authController.signup
);

// * POST /auth/signin
router.post("/signin", authController.signin);

module.exports = router;
