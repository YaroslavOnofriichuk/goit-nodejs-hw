const {
  userSchema: { User },
} = require("../../service");

const current = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  }
};

module.exports = current;
