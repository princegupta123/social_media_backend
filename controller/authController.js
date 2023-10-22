import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const User = db.user;

export const register = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    //validating all fields
    if (!username || !email || !password || !name) {
      return res.status(404).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    //checking if user exists or not
    const data = await User.findOne({
      where: {
        email: email,
      },
    });
    if (data)
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //store the data in database
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      name: name,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating the user",
      error,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, passwordFromBody } = req.body;
    //validating fields
    if (!email || !passwordFromBody) {
      return res.status(404).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const isExist = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const checkPassword = await bcrypt.compare(
      passwordFromBody,
      isExist?.password
    );
    if (!checkPassword) {
      return res
        .status(403)
        .send({ success: false, message: "Incorrect Password" });
    }
    //generating token for authentication
    const token = jwt.sign({ id: isExist.id }, process.env.JWT_SEC);

    const userResponse = {
      id: isExist?.id,
      username: isExist?.username,
      email: isExist?.email,
      age: isExist?.age,
      profilePic: isExist?.profilePic,
      coverImg: isExist?.coverPic
    };
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        success: true,
        message: 'User logged In successfully',
        data: userResponse,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging in the user",
      error,
    });
  }
};

export const logout =async(req, res)=>{
try {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out");
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Error while logging out the user",
    error,
  });
}
}