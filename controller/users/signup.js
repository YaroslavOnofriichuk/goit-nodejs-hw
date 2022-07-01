const {
  userSchema: { joiUserSchema, User },
} = require("../../service");
const { sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = joiUserSchema.validate({ ...req.body });
  let hash = null;
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  if (error) {
    return next(createError(401, error.message));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(createError(409, "Email in use"));
  }

  try {
    hash = await bcrypt.hash(password, 9);
  } catch (error) {
    console.log(error);
  }

  if (hash) {
    const newUser = await User.create({
      email,
      password: hash,
      avatarURL,
      verificationToken,
    });
    sendEmail(email, verificationToken);
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
