// const users = require("./../data/user");
const Users = require("./../model/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();

    if (!users) {
      throw new Error("No user found");
    }

    res.status(200).json({
      status: "success",
      message: "All users fetched successfully",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      throw new Error(`User not found with id of ${id}`);
    }
    const fullname = user.getFullName();

    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: {
        user,
        fullname,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    if (!newUser) {
      throw new Error("An error occurred while creating the user");
    }
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
};
