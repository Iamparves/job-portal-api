const express = require("express");
const jobController = require("../../controllers/job.controllers");
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const router = express.Router();

router
  .route("/")
  .get(
    verifyToken,
    authorization("hiring-manager"),
    jobController.getManagerJob
  );

module.exports = router;
