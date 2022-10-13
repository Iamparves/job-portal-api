const express = require("express");
const userController = require("../../controllers/user.controllers");
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const router = express.Router();

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/me").get(verifyToken, userController.getMe);

router
  .route("/candidates")
  .get(verifyToken, authorization("admin"), userController.getCandidates);

router
  .route("/candidates/:id")
  .get(verifyToken, authorization("admin"), userController.getCandidateById);

router
  .route("/hiring-managers")
  .get(verifyToken, authorization("admin"), userController.getHiringManagers);

router
  .route("/:id")
  .patch(verifyToken, authorization("admin"), userController.updateUser);

module.exports = router;
