const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscription = require("./updateSubscription");
const avatars = require("./avatars");
const verifyByToken = require("./verifyByToken");
const verifyByEmail = require("./verifyByEmail");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  avatars,
  verifyByToken,
  verifyByEmail,
};
