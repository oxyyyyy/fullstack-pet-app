const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const jwtExpiresIn = "1h";

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

exports.signin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let userGlobal;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("Wrong email");
        error.statusCode = 401;
        throw error;
      }

      userGlobal = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { id: userGlobal._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: jwtExpiresIn }
      );

      // const today = new Date();
      // const jwtExpiresInDate = today.setHours(
      //   today.getHours() + parseInt(jwtExpiresIn)
      // );

      res.json({ token, id: userGlobal._id.toString() });
    })
    .catch((err) => {
      next(err);
    });
};
