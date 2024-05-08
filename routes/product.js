const express = require("express");
const { getAllProducts, sayHello } = require("./../controllers/product");

const router = express.Router();

router.route("/").get(getAllProducts).post(sayHello);

router.route("/:id").get();

module.exports = router;
