import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (
    !userName ||
    !email ||
    !password ||
    userName === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Encrypted Passwrd In Bcrypt.js

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("SignUp Successful");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({
      email,
    });
    console.log("Found user:", validUser);
    if (!validUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    //Decrypt and Compare password in hashcode
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    console.log("Generated token:", token);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged Out!");
  } catch (error) {
    next(error);
  }
};

export const allUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (error) {
    next(error);
  }
};
