const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const postsRouter = require("./router/posts");
const authRouter = require("./router/auth");

const app = express();

const db = mongoose.connection;

app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-m2kce.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connection success");
  app.listen(8081);
});
