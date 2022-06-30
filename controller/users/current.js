const {
  userSchema: { User },
} = require("../../service");
const createError = require("http-errors");

const current = async (req, res, next) => {
  const { _id: id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(createError(401, "Not authorized"));
  } else {
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  }
};

module.exports = current;
