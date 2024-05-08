const dotenv = require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 5000;
console.log(port);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
