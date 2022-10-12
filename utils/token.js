const jwt = require("jsonwebtoken");

module.exports.generateToken = (userInfo) => {
  const payload = {
    id: userInfo._id,
    email: userInfo.email,
    name: `${userInfo.firstName} ${userInfo.lastName}`,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "3days",
  });

  return token;
};
