const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { mongoConnection } = require("./config/db");
const userRouter = require("./routes/user.router");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/globalErrorHandler.middleware");

const connect = async () => {
  try {
    await mongoConnection();
  } catch (err) {
    console.log(`${err.message}`);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
connect();
app.use(userRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find base URL${req.originalUrl} on this server`, 404)
  );
});

app.use(errorHandler);

module.exports = app;
