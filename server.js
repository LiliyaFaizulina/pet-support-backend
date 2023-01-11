const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

mongoose.set("strictQuery", true);

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connect success");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
