const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const router = require("./src/routes/routes");
const openApiDocumentation = require("./src/swagger/openApiDocumentation");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const app = express();

dotenv.config();

//  Connect to DB
const { ENVIRONMENT, ATLAS_URI, LOCAL_MONGO_DB_URL } = process.env;
const dbUrl = ENVIRONMENT === "production" ? ATLAS_URI : LOCAL_MONGO_DB_URL;
mongoose
  .connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Connection to DB failed: ", err);
  });

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use("/v1", router);

app.get("/", (req, res) => {
  res.redirect("/v1/api-docs");
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  console.log({
    message: error.message,
    stack: error.stack,
  });
  res.status(status).json({
    message: error.message,
    stack: process.env.ENVIRONMENT === "development" ? error.stack : null,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Store Management API is running on port: ${port}`)
);
