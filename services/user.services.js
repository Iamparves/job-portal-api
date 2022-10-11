const User = require("../models/User");

module.exports.signupService = async (userData) => {
  const result = await User.create(userData);
  return result;
};

module.exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};