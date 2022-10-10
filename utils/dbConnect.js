const mongoose = require("mongoose");

const dbConnect = () => {
  return mongoose
    .connect(process.env.DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Database connection is successful`);
    });
};

module.exports = dbConnect;
