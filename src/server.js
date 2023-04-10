const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "src/config/config.env" });

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
