import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const userSchema = new Schema({
  username: {
    type: String,
  },
  bio: {
    type: String,
  },
  account: {
    type: String,
    required: [true, "must provide a account address"],
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  banner: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
