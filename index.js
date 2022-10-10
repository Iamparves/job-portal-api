const dotenv = require("dotenv").config();
const dbConnect = require("./utils/dbConnect");
const app = require("./app");

dbConnect();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
