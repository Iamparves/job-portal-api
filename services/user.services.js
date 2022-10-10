const User = require("../models/User");

module.exports.signupService = async (userData) => {
  const result = await User.create(userData);
  return result;
};
