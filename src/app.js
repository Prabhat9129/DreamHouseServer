const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { mongoConnection } = require("./config/db");
const authRouter = require("./routes/auth.router");
const resident_typeRouter = require("./routes/resident_type.router");
const property_typeRouter = require("./routes/property_type.router");
const propertyRouter = require("./routes/properties.router");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/globalErrorHandler.middleware");
const protection = require("./middleware/protect.middleware");

const connect = async () => {
  try {
    await mongoConnection();
  } catch (err) {
    console.log(`${err.message}`);
  }
};

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
connect();
app.use(authRouter);
app.use(protection);
app.use(resident_typeRouter);
app.use(property_typeRouter);
app.use(propertyRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find base URL${req.originalUrl} on this server`, 404)
  );
});

app.use(errorHandler);

module.exports = app;
