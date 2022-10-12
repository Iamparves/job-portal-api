const Job = require("../models/Job");
const User = require("../models/User");

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
  const job = await Job.findById(jobId).populate(
    "hiringManager.id",
    "-password -resume"
  );
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

module.exports.getManagerJobByIdService = async (jobId) => {
  const jobs = await Job.findById(jobId).populate(
    "candidates.id",
    "-password -appliedJobs"
  );
  return jobs;
};

module.exports.applyJobService = async (job, user) => {
  const result = await Job.updateOne(
    { _id: job._id },
    {
      $push: {
        candidates: { name: user.name, applyDate: new Date(), id: user.id },
      },
      $inc: { applicantCount: 1 },
    },
    { runValidators: true }
  );

  const result2 = await User.updateOne(
    { _id: user.id },
    {
      $push: {
        appliedJobs: { title: job.title, applyDate: new Date(), id: job._id },
      },
    },
    { runValidators: true }
  );

  return [result, result2];
};

module.exports.getTopPaidJobsService = async () => {
  const jobs = await Job.find({})
    .sort("-salary")
    .limit(10)
    .select("-candidates");
  return jobs;
};

module.exports.getMostAppliedJobsService = async () => {
  const jobs = await Job.find({})
    .sort("-applicantCount")
    .limit(5)
    .select("-candidates");
  return jobs;
};
