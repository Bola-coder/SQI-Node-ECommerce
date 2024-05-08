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

const createNewProduct = async (req, res) => {};

const getProductDetails = async (req, res) => {};

const sayHello = async (req, res) => {
  res.send("Hello Worldsbvhsdbvjsdbjdb");
};

module.exports = { getAllProducts, sayHello };
