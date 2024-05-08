import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  //hashing the password for safety
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // storing in database using model
  const newUser = new User({ username, email, password: hashedPassword });
  // to handle the multiple login of same users or emails
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
