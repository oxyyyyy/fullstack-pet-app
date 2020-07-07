import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  name: string;
  avatar: string;
  posts: [{}];
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
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

export default mongoose.model<UserInterface>("User", userSchema);
