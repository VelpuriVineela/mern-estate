import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  //storing  the data from user
  const { email, password } = req.body;
  try {
    // checking email
    const validUser = await User.findOne({ email: email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    // check passoword
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }

    // token creation
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // remove the password while sending back
    const { password: pass, ...rest } = validUser._doc;

    // save token as cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
