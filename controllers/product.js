const products = require("./../data/product");
const Products = require("./../model/product");
const getAllProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const products = await Products.find({ user: userId }).populate("user");
    res.status(200).json({
      status: "success",
      message: "All products fetched successfully",
      result: products.length,
      data: {
        products,
      },
    });
  } catch (error) {}
};

const createNewProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, price, description } = req.body;
    if (!title || !price || !description) {
      throw new Error("Please provide all required fields");
    }
    const newProduct = await Products.create({
      title,
      price,
      description,
      user: userId,
    });
    if (!newProduct) {
      throw new Error("An error occurred while creating the product");
    }
    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: {
        product: newProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      throw new Error(`Product not found with id of ${id}`);
    }
    res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

const updateProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updateDetails = req.body;

    // console.log("Updated details", updateDetails);

    if (!id) {
      throw new Error("Please provide the product id");
    }
    const updatedProduct = await Products.findByIdAndUpdate(id, updateDetails, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: {
        product: updatedProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Products.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "An error occurred with message: " + error.message,
    });
  }
};

const getAllProductsByAdmin = async (req, res) => {
  try {
    const products = await Products.find().populate("user");
    res.status(200).json({
      status: "success",
      message: "All products fetched successfully",
      result: products.length,
      data: {
        products,
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
  getAllProducts,
  createNewProduct,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
  getAllProductsByAdmin,
};
