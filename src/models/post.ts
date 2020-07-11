import mongoose, { Schema } from "mongoose";

import { InterfacePost } from "../types/types";

export interface InterfaceUserModel extends InterfacePost, Document {}

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<InterfaceUserModel>("Post", postSchema);
