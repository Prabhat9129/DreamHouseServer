const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ratelimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const { mongoConnection } = require("./config/db");
const authRouter = require("./routes/auth.router");
const resident_typeRouter = require("./routes/resident_type.router");
const property_typeRouter = require("./routes/property_type.router");
const propertyRouter = require("./routes/properties.router");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/globalErrorHandler.middleware");
const protect = require("./middleware/protect.middleware");

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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

connect();

const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try in an Hour",
});
app.use("/api", limiter);
app.use(authRouter);
app.use(protect);
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
