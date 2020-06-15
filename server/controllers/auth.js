const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      const user = new User({
        email,
        password: hash,
        name,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User was created", userID: result._id });
    })
    .catch((err) => {
      next(err);
    });
};
