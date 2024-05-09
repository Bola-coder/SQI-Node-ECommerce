const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
} = require("./../controllers/product");

const router = express.Router();

router.route("/").get(getAllProducts).post(createNewProduct);

router
  .route("/:id")
  .get(getProductDetails)
  .patch(updateProductDetails)
  .delete(deleteProduct);

module.exports = router;
