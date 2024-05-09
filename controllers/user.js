const users = require("./../data/user");

const getAllUsers = async (req, res) => {
  try {
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
    const { id } = req.params;
    const user = users.find((user) => user.id === Number(id));
    if (!user) {
      throw new Error(`User not found with id of ${id}`);
    }
    res.status(200).json({
      status: "success",
      message: "User fetched successfully",
      data: {
        user,
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
    const lastUserId = users.length;
    const newUserId = lastUserId + 1;
    const { name, email } = req.body;
    if (!name || !email) {
      throw new Error("Please provide all required fields");
    }
    users.push({ id: newUserId, name, email });
    const newUser = {
      id: newUserId,
      name,
      email,
    };

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
