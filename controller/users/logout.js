const {
  userSchema: { User },
} = require("../../service");
const createError = require("http-errors");

const logout = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) {
    return next(createError(401, "Not authorized"));
  } else {
    res.status(204).json({ message: "No Content" });
  }
};

module.exports = logout;
