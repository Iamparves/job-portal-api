const { signupService } = require("../services/user.services");

module.exports.signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);

    res.status(200).send({
      success: true,
      message: "Sign up successful"
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};
