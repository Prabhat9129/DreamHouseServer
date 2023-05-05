const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });


const mongoConnection = async () => {
// Define database connection URL
const mongoURL = process.env.MONGOURL.replace(
  "<password>",
  process.env.PASSWORD
);

// Connect to MongoDB database
mongoose.connect(mongoURL)
.then(() => {
  // console.log('Connected to MongoDB database')
})
.catch((err) => {
  console.error('Error connecting to MongoDB database:', err.message);
});


// Once database connection is established
  mongoose.connection.once("open", () => {
    console.log("connection redy");
  });

// Handle MongoDB connection errors
  mongoose.connection.on("error", (err) => {
    console.error(`Not connection error: ${err}`);
  });

// Handle MongoDB connection disconnections
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection disconnected');
});

// Handle application termination
process.on('SIGINT', () => {
  mongoose.connection.close().then(()=>{
    console.log('MongoDB connection terminated');
    process.exit(0);
  });
});
  
};

module.exports = { mongoConnection };
