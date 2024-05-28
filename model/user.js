const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide a last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Email must be unique"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  bio: {
    type: String,
    trim: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.methods.getFullName = function () {
  return `${this.firstname} ${this.lastname}`;
};

userSchema.methods.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
