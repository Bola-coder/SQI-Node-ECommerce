const Users = require("./../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signJWt = require("./../utils/signJwt");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");

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

    // Send welcome mail
    const options = {
      email: email,
      subject: "Welcome to SQI Commerce",
      message:
        "Welcome Onboard. We are pleased to have you. Please keep your eyes peeled for the verification link which you will recieve soon.\n Shop and spend your money.",
    };
    await sendEmail(options);

    //------- Send email verification link--------
    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    console.log(verificationToken);
    // Hash the verification token
    const hashedVerificationToken = await bcrypt.hash(verificationToken, salt);

    // Create verification url
    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify/${user.email}/${verificationToken}`;

    // Create verification message
    const verificationMessage = `Please click on the link below to verify your email address. \n ${verificationUrl} `;

    // Verification mail options
    const verificationMailOptions = {
      email: email,
      subject: "Verify your email address",
      message: verificationMessage,
    };

    // Send verification mail
    await sendEmail(verificationMailOptions);

    // Update user record with hashed verification token
    user.verification_token = hashedVerificationToken;
    await user.save();

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

const verifyEmailAddress = async (req, res, next) => {
  try {
    const { email, verificationToken } = req.params;

    if (!email || !verificationToken) {
      throw new Error("Please provide email and token");
    }

    // check if user with the email exist
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("User with the email not found");
    }

    const tokenValid = await bcrypt.compare(
      verificationToken,
      user.verification_token
    );

    if (!tokenValid) {
      throw new Error("failed to verify user - Invalid tokne");
    }

    user.email_verified = true;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "User verified successfully",
      data: {
        user,
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
  verifyEmailAddress,
};
