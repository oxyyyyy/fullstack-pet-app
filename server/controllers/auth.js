const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const saltRounds = 10;
const jwtExpiresIn = "1h";

exports.signup = async (req, res, next) => {
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

exports.signin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Wrong email");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: jwtExpiresIn }
    );

    // const today = new Date();
    // const jwtExpiresInDate = today.setHours(
    //   today.getHours() + parseInt(jwtExpiresIn)
    // );

    res.json({
      token,
      id: user._id.toString(),
      username: user.name,
    });
  } catch (err) {
    next(err);
  }
};
