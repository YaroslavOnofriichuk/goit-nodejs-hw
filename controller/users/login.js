const {
  userSchema: { joiUserSchema, User },
} = require("../../service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = joiUserSchema.validate({ ...req.body });
  let checkPasswordResult = false;
  const { SECRET_KEY } = process.env;

  if (error) {
    res.status(400).json({ message: error.message });
  }

  const user = await User.findOne({ email });

  try {
    checkPasswordResult = await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log(error);
  }

  if (!user || !checkPasswordResult) {
    res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  const newUser = await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token: token,
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = login;
