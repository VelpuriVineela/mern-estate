import mongoose from "mongoose";

// Schema or rules
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unqiue: true,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //records the time of creation and updation
);

//model
const User = mongoose.model("User", userSchema);

export default User;
