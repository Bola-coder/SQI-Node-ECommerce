const express = require("express");
const productRoutes = require("./routes/product");
const app = express();

app.use("/api/v1/products", productRoutes);

module.exports = app;
