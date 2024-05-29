const Users = require("./../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signJWt = require("./../utils/signJwt");

const signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, bio, role } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    // Check if the user with the email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      throw new Error("User with the email address already exists");
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // Create User account
    const user = await Users.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      bio,
      role,
    });

    if (!user) {
      throw new Error("Failed to create user account");
    }

    // Create auth token
    const token = signJWt(user._id);

    res.status(201).json({
      status: "success",
      data: {
        user,
        token,
      },
    });

    // Create User account
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // Check if the user account exists
    const user = await Users.findOne({ email }).select("+password");
    console.log(user);

    // Check if the password is correct

    if (!user || !(await user.comparePassword(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    // Create auth token
    const token = signJWt(user._id);
    // send response
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
