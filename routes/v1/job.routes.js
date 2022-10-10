const express = require("express");
const jobController = require("../../controllers/job.controllers");

const router = express.Router();

router.route("/").post(jobController.createJob).get(jobController.getJobs);

router.route("/:id").get(jobController.getJobById);

module.exports = router;
