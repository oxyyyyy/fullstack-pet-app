const router = require("express").Router();
const { check } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");

// POST /auth
router.post(
  "/",
  [
    check("email")
      .isEmail()
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .normalizeEmail(),
    check("password").trim().isLength({ min: 6 }),
    check("name").trim().notEmpty(),
  ],
  authController.signup
);

module.exports = router;
