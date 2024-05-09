const products = require("./../data/product");
const getAllProducts = async (req, res) => {
  try {
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
    const lastProductIndex = products.length;
    const newProductId = lastProductIndex + 1;
    const { title, price, description, category } = req.body;
    if (!title || !price || !description || !category) {
      throw new Error("Please provide all required fields");
    }
    products.push({ id: newProductId, title, price, description, category });
    const newProduct = {
      id: newProductId,
      title,
      price,
      description,
      category,
    };

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
    const product = products.find((product) => product.id === Number(id));
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

    const product = products.find((product) => product.id === Number(id));

    if (!product) {
      throw new Error(`Product not found with id of ${id}`);
    }
    // console.log("Current product", product);

    const updatedProduct = { ...product, ...updateDetails };
    // console.log("Updated product", updatedProduct);

    const index = products.indexOf(product);
    products[index] = updatedProduct;
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
    const product = products.find((product) => product.id === Number(id));
    if (!product) {
      throw new Error(`Product not found with id of ${id}`);
    }
    const index = products.indexOf(product);
    products.splice(index, 1);
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

module.exports = {
  getAllProducts,
  createNewProduct,
  getProductDetails,
  updateProductDetails,
  deleteProduct,
};
