const express = require("express");
const {
  getAllProducts,
  createNewProduct,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
  getAllProductsByAdmin,
} = require("./../controllers/product");
const authMiddleware = require("./../middleware/auth");

const router = express.Router();

router.use(authMiddleware.protectRoute);
router
  .route("/")
  .get(authMiddleware.protectRoute, getAllProducts)
  .post(authMiddleware.protectRoute, createNewProduct);

router
  .route("/admin")
  .get(
    authMiddleware.protectRoute,
    authMiddleware.verifyIsAdmin,
    getAllProductsByAdmin
  );

router
  .route("/:id")
  .get(getProductDetails)
  .patch(updateProductDetails)
  .delete(deleteProduct);

module.exports = router;
