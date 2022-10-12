const {
  createJobService,
  getJobsService,
  getJobByIdService,
  updateJobService,
  getManagerJobService,
  applyJobService,
  getManagerJobByIdService,
  getTopPaidJobsService,
  getMostAppliedJobsService,
} = require("../services/job.services");

module.exports.createJob = async (req, res) => {
  try {
    const jobData = { ...req.body };
    jobData.hiringManager = {
      name: req.user.name,
      id: req.user.id,
    };

    const result = await createJobService(jobData);

    res.status(200).send({
      success: true,
      message: "job created successfully",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getJobs = async (req, res) => {
  try {
    const { sort, fields, page, limit, ...filters } = req.query;
    const queries = {};

    queries.sort = sort ? sort.split(",").join(" ") : "";
    queries.fields = fields
      ? fields.split(",").join(" ")
      : "-candidates -hiringManager";
    queries.page = page ? +page : 1;
    queries.limit = limit ? +limit : 0;

    const jobs = await getJobsService(filters, queries);

    res.status(200).send({
      success: true,
      message: "Jobs found successfully",
      data: jobs,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getJobById = async (req, res) => {
  try {
    const job = await getJobByIdService(req.params.id);

    const { candidates, ...others } = job.toObject();

    res.status(200).send({
      success: true,
      message: "Job found successfully",
      data: others,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.updateJob = async (req, res) => {
  try {
    const result = await updateJobService(req.params.id, req.body);

    res.status(200).send({
      success: true,
      message: "Job updated successfully",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getManagerJob = async (req, res) => {
  try {
    const user = req.user;

    const jobs = await getManagerJobService(user.id);

    res.status(200).send({
      success: true,
      message: "Jobs found successfully",
      data: jobs,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getManagerJobById = async (req, res) => {
  try {
    const job = await getManagerJobByIdService(req.params.id);

    if (job.hiringManager.id != req.user.id) {
      return res.status(400).send({
        success: false,
        error: "This job isn't managed by you",
      });
    }

    res.status(200).send({
      success: true,
      message: "Job found successfully",
      data: job,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.applyJob = async (req, res) => {
  try {
    const job = await getJobByIdService(req.params.id);

    if (!job) {
      return res.status(400).send({
        success: false,
        error: "Didn't find the job",
      });
    }

    const isDeadlineOver = job.checkDeadlineOver();

    if (isDeadlineOver) {
      return res.status(400).send({
        success: false,
        error: "Deadline is over",
      });
    }

    const applied = job.candidates.findIndex((cand) => cand.id == req.user.id);

    if (applied >= 0) {
      return res.status(400).send({
        success: false,
        error: "You already applied for this job",
      });
    }

    const result = await applyJobService(job, req.user);

    res.status(200).send({
      success: true,
      message: "Job application successful",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getTopPaidJobs = async (req, res) => {
  try {
    const jobs = await getTopPaidJobsService();

    res.status(200).send({
      success: true,
      message: "Found the top paid jobs",
      data: jobs,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getMostAppliedJobs = async (req, res) => {
  try {
    const jobs = await getMostAppliedJobsService();

    res.status(200).send({
      success: true,
      message: "Found the most applied jobs",
      data: jobs,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};
