const mongoose = require("mongoose");
const Job = require("../models/Job");
const ObjectId = mongoose.Types.ObjectId;

module.exports.createJobService = async (jobData) => {
  const result = await Job.create(jobData);
  return result;
};

module.exports.getJobsService = async () => {
  const jobs = await Job.find({}).select("-candidates -hiringManager");
  return jobs;
};

module.exports.getJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId)
    .select("-candidates")
    .populate("hiringManager.id", "-password -resume");
  return job;
};

module.exports.updateJobService = async (jobId, updateData) => {
  const result = await Job.updateOne(
    { _id: jobId },
    { $set: updateData },
    { runValidators: true }
  );

  return result;
};

module.exports.getManagerJobService = async (managerId) => {
  const jobs = await Job.find({ "hiringManager.id": ObjectId(managerId) });
  return jobs;
};
