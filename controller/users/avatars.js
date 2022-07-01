const {
  userSchema: { User },
} = require("../../service");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");
const createError = require("http-errors");

const avatars = async (req, res, next) => {
  const { _id: id } = req.user;
  const { path: filePath, filename } = req.file;
  const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
  const resultUpload = path.join(avatarsDir, filename);

  try {
    const image = await Jimp.read(filePath);
    await image.resize(250, 250);
    await image.writeAsync(filePath);
  } catch (error) {
    return next(createError(401, "Not authorized"));
  }

  try {
    await fs.rename(filePath, resultUpload);
    const user = await User.findByIdAndUpdate(
      id,
      {
        avatarURL: path.join("avatars", filename),
      },
      { new: true }
    );
    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    await fs.unlink(filePath);
    return next(createError(401, "Not authorized"));
  }
};

module.exports = avatars;
