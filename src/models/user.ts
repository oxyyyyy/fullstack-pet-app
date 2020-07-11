import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { InterfaceUser } from "../types/types";

export interface InterfaceUserModel extends InterfaceUser, Document {
  generateJWT(): string;
  passwordIsValid(password: string): boolean;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  ],
});

userSchema.methods.generateJWT = function (): string {
  const jwtExpiresIn = "72h";
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET!, {
    expiresIn: jwtExpiresIn,
  });
};

userSchema.methods.passwordIsValid = async function (password: string) {
  return await bcrypt.compare(password, this.user.hash);
};

export default mongoose.model<InterfaceUserModel>("User", userSchema);
