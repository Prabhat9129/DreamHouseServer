//NPM pacakages
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require("express-fileupload");

//import created modules
const { mongoConnection } = require("./config/db");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const resident_typeRouter = require("./routes/resident_type.router");
const property_typeRouter = require("./routes/property_type.router");
const propertyRouter = require("./routes/properties.router");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/globalErrorHandler.middleware");
const protect = require("./middleware/protect.middleware");

const app = express();

//Implement CORS
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
// //limit request from same Api
// const limiter = rateLimit({
//   max: 1,
//   windowMs: 1 * 1000,
//   message: "Too many request from this IP, please try in an Hour",
// });
// app.use(limiter);

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//set security http headers
app.use(helmet());

// body parser, reading data from body into req body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set cookies
app.use(cookieParser());

// connect to mongodb Database
mongoConnection();

// Routers
app.use(authRouter);
app.use(protect);
app.use(userRouter);
app.use(resident_typeRouter);
app.use(property_typeRouter);
app.use(propertyRouter);

// url not found Global Error Handling Middleware
app.all("*", (req, res, next) => {
  next(
    new AppError(`can't find base URL${req.originalUrl} on this server`, 404)
  );
});

app.use(errorHandler);

module.exports = app;
