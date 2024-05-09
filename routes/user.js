const express = require("express");
const userController = require("./../controllers/user");
const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser);

router.route("/:id").get(userController.getSingleUser);

module.exports = router;
