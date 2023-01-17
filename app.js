const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const usersRouter = require("./routes/api/users");
const noticesRouter = require("./routes/api/notices");
const petsRouter = require("./routes/api/pets");
const newsRouter = require("./routes/api/news");
const sponsorsRouter = require("./routes/api/sponsors");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
  secure: true,
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/pets", petsRouter);
app.use("/api/news", newsRouter);
app.use("/api/sponsors", sponsorsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
