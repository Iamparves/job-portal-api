const Job = require("../models/Job");

module.exports.createJobService = async (jobData) => {
  const result = await Job.create(jobData);
  return result;
};

module.exports.getJobsService = async (filters, queries) => {
  const jobs = await Job.find(filters)
    .select(queries.fields)
    .skip((queries.page - 1) * queries.limit)
    .limit(queries.limit)
    .sort(queries.sort);

  const total = await Job.countDocuments(filters);
  const page = queries.limit ? Math.ceil(total / queries.limit) : 1;

  return { total, page, jobs };
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
  const jobs = await Job.find({ "hiringManager.id": managerId });
  return jobs;
};
