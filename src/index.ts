import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { AddressInfo } from "net";

import { Request, Response, NextFunction } from "express";

import { BetterError } from "./types/types";

import postsRouter from "./router/posts";
import authRouter from "./router/auth";
import profileRouter from "./router/profile";

dotenv.config();

const app = express();

const db = mongoose.connection;

const isProduction = process.env.NODE_ENV === "production";

app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// * Database connection

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-m2kce.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

if (!isProduction) {
  mongoose.set("debug", true);
}

// * Headers config

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// * File uploading

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

app.use(
  multer({
    storage: storageConfig,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      }

      cb(
        new Error(
          "Error: File upload only supports the following filetypes - " +
            filetypes
        )
      );
    },
  }).single("filedata")
);

// * Router

app.use("/posts", postsRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// * Error handlers

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err: BetterError = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
    const { port } = server.address() as AddressInfo;
    console.log("Listening on port " + port);
  });
});
