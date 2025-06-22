import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "public/uploads/");
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname);
  },
});

const upload = multer({ storage });

authRouter.post(
  "/register",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      const profileImage = req.file;

      if (!profileImage) {
        return res
          .status(400)
          .json({ success: false, message: "No image uploaded" });
      }

      const profileImagePath = profileImage.path;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists!" });
      }

      // hashing the password
      const salt = await bcrypt.genSalt();
      const hashpassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstname,
        lastname,
        email,
        password: hashpassword,
        profileImagePath,
        tripList: [],
        wishList: [],
        propertyList: [],
        reservationList: [],
      });

      await newUser.save();

      res
        .status(200)
        .json({
          success: true,
          message: "User registerd successfuly!",
          user: newUser,
        });
    } catch (error) {
      console.log(error);
      res.status("500").json({
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
); 

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userData = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      profileImagePath: user.profileImagePath,
      tripList: user.tripList,
      wishList: user.wishList,
      propertyList: user.propertyList,
      reservationList: user.reservationList,
    };

    res.status(200).json({ success: true, token, user: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default authRouter;
