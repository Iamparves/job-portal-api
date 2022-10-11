const jwt = require("jsonwebtoken");

module.exports.generateToken = (userInfo) => {
  const payload = {
    id: userInfo._id,
    email: userInfo.email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "3days",
  });

  return token;
};
