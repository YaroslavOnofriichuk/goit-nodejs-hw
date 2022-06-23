const {
  userSchema: { User },
} = require("../../service");

const logout = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    res.status(204).json({ message: "No Content" });
  }
};

module.exports = logout;
