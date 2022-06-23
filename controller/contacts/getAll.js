const {
  contactSchema: { Contact },
} = require("../../service");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let contacts = null;

  if (favorite === undefined) {
    contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    });
  } else {
    contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    });
  }

  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAll;
