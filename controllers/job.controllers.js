const {
  createJobService,
  getJobsService,
  getJobByIdService,
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
    const jobs = await getJobsService();

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
