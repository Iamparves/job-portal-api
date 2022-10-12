const {
  createJobService,
  getJobsService,
  getJobByIdService,
  updateJobService,
  getManagerJobService,
} = require("../services/job.services");

module.exports.createJob = async (req, res) => {
  try {
    const result = await createJobService(req.body);

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
