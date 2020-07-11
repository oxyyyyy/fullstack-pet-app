import { Request } from "express";
import { ValidationError } from "express-validator";
import { Schema, Document } from "mongoose";

export interface BetterError extends Error {
  statusCode?: number;
  data?: ValidationError[];
}

export interface req extends Request {
  userID?: string;
}

export interface InterfaceUser extends Document {
  email: string;
  hash: string;
  name: string;
  avatar?: string;
  posts: Schema.Types.ObjectId[];
}

export interface InterfacePost extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
}
