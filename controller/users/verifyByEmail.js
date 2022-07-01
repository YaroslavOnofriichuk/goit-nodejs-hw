const {
  userSchema: { User },
} = require("../../service");
const createError = require("http-errors");
const { sendEmail } = require("../../helpers");

const verifyByEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(createError(400, "missing required field email"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createError(404, "User not found"));
  }

  if (user.verify) {
    return next(createError(400, "Verification has already been passed"));
  }

  sendEmail(email, user.verificationToken);

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = verifyByEmail;
