const { createUser } = require("../service/user.service");
const asyncFunction = require("../utils/asyncFunction");

const createdUser = asyncFunction(async (req, res) => {
  const u = await createUser(req.body);
  console.log(u);
  return res.status(stausCode).json({
    staus: u.status,
    message: u.message,
    newUser: u.newUser,
  });
});

module.exports = { createdUser };
