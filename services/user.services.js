const User = require("../models/User");

module.exports.signupService = async (userData) => {
  const result = await User.create(userData);
  return result;
};

module.exports.findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports.getCandidatesService = async () => {
  const candidates = await User.find({ role: "candidate" }).select(
    "-password -appliedJobs"
  );
  return candidates;
};

module.exports.getCandidateByIdService = async (candidateId) => {
  const candidate = await User.findById(candidateId)
    .populate("appliedJobs.id")
    .select("-password");
  return candidate;
};

module.exports.getHiringManagersService = async () => {
  const managers = await User.find({ role: "hiring-manager" }).select(
    "-password"
  );
  return managers;
};

module.exports.updateUserService = async (userId, data) => {
  const result = await User.updateOne(
    { _id: userId },
    { $set: data },
    { runValidators: true }
  );

  return result;
};
