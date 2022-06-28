const {
  userSchema: { joiUserSchema, User },
} = require("../../service");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = joiUserSchema.validate({ ...req.body });
  let hash = null;
  const avatarURL = gravatar.url(email);

  if (error) {
    res.status(400).json({ message: error.message });
  }

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email in use" });
  }

  try {
    hash = await bcrypt.hash(password, 9);
  } catch (error) {
    console.log(error);
  }

  if (hash) {
    const newUser = await User.create({ email, password: hash, avatarURL });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = signup;
