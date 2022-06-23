const {
  userSchema: { User },
} = require("../../service");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (
    subscription !== "starter" &&
    subscription !== "pro" &&
    subscription !== "business"
  ) {
    res.status(400).json({
      message: "'subscription' must be one of [starter, pro, business]",
    });
  } else {
    const user = await User.findByIdAndUpdate(_id, {
      subscription,
    });
    if (user) {
      user.subscription = subscription;
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
};

module.exports = updateSubscription;
