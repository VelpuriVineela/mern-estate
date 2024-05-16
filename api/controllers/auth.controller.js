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

// google auth
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    //if user exists in db, register's the user
    if (user) {
      // token creation
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // dont pass password, separate rest and password
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
      // create the  new user
    } else {
      // generate the random passowrd because of schema
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // Ex - 89374hihfejndcvj
      // hashed the generated password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // new User created
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

//sign Out functionality
export const signOut = async (req, res, next) => {
  try {
    // clear the cookie
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
