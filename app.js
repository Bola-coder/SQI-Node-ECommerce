const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to SQICommerce",
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to SQICommerce API",
  });
});

// app.use((req, res, next) => {
//   console.log("Davido is the GOAT (001)");
//   next();
// });

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;

// Assignment for May 14th 2024.
/*
  Create a user.js file inside the model folder
  Create a userSchema and give it 3 fields
  No two users should have the same email,
  Password should be at least 8 char long,
  Update the user controllers to use the Users model
*/
