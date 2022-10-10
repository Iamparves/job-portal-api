const Job = require("../models/Job");

module.exports.createJobService = async (jobData) => {
  const result = await Job.create(jobData);
  return result;
};

module.exports.getJobsService = async () => {
  const jobs = await Job.find({}).select("-candidates -hiringManager");
  return jobs;
};

module.exports.getJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId).select("-candidates").populate("hiringManager.id", "-password -resume");
  return job;
};
