const mongo = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

const mongoURL = process.env.MONGOURL.replace(
  "<password>",
  process.env.PASSWORD
);

const mongoConnection = async () => {
  mongo.connection.once("open", () => {
    console.log("connection redy");
  });
  mongo.connection.on("error", () => {
    console.log(`Not connected, error ${error}`);
  });
  mongo.set("strictQuery", true);
  await mongo.connect(mongoURL);
};

module.exports = { mongoConnection };
