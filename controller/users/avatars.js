const {
  userSchema: { User },
} = require("../../service");
const Jimp = require("jimp");
const fs = require("fs/promises");
const path = require("path");

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
    res.status(401).json({ message: "Not authorized" });
    throw new Error(error.message);
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
    res.status(401).json({ message: "Not authorized" });
    throw new Error(error.message);
  }
};

module.exports = avatars;
