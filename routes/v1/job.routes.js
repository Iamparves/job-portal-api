const express = require("express");
const jobController = require("../../controllers/job.controllers");
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const router = express.Router();

router
  .route("/")
  .post(verifyToken, authorization("hiring-manager"), jobController.createJob)
  .get(jobController.getJobs);

router.get("/top-paid", jobController.getTopPaidJobs);
router.get("/most-applied", jobController.getMostAppliedJobs);

router
  .route("/:id/apply")
  .post(verifyToken, authorization("candidate"), jobController.applyJob);

router
  .route("/:id")
  .get(jobController.getJobById)
  .patch(verifyToken, authorization("hiring-manager"), jobController.updateJob);

module.exports = router;
