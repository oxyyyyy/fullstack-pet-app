const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const postsRouter = require("./router/posts");
const authRouter = require("./router/auth");

const app = express();

const db = mongoose.connection;

const isProduction = process.env.NODE_ENV === "production";

app.use(morgan("tiny"));
app.use(bodyParser.json());

// * Database connection

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-m2kce.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

if (!isProduction) {
  mongoose.set("debug", true);
}

// * Headers config

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// * Router

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

// * Error handlers

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// * Launch

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connection success");
  const server = app.listen(process.env.PORT || 8081, function () {
    console.log("Listening on port " + server.address().port);
  });
});
