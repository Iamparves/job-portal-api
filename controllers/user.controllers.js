const { signupService, findUserByEmail } = require("../services/user.services");
const { generateToken } = require("../utils/token");

module.exports.signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);

    res.status(200).send({
      success: true,
      message: "Sign up successful",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        error: "Please provide email and password",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).send({
        success: false,
        error: "User not found. Plese create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({
        success: false,
        error: "Password didn't match",
      });
    }

    if (user.status !== "active") {
      return res.status(400).send({
        success: false,
        error: "Please activate your acccount to continue",
      });
    }

    const token = generateToken(user);

    const { password: pass, ...others } = user.toObject();

    res.status(200).send({
      success: true,
      message: "Login successful",
      data: {
        user: others,
        token,
      },
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

module.exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user?.email);

    const {password, ...others} = user.toObject();

    res.status(200).send({
      success: true,
      data: others,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};
