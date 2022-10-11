const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        error: "You are not logged in",
      });
    }

    const decodedUser = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    req.user = decodedUser;

    next();
  } catch (err) {
    res.status(403).send({
      success: false,
      error: "Invalid token",
    });
  }
};
