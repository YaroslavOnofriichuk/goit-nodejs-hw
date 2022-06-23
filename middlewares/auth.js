const {
  userSchema: { User },
} = require("../service");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { SECRET_KEY } = process.env;
  let userId = "";

  if (bearer !== "Bearer") {
    res.status(401).json({ message: "Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    userId = id;
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not authorized" });
  }

  const user = await User.findById(userId);

  if (!user || !user.token) {
    res.status(401).json({ message: "Not authorized" });
  }

  req.user = user;
  next();
};

module.exports = auth;
