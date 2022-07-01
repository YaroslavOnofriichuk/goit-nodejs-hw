const {
  contactSchema: { Contact },
} = require("../../service");
const createError = require("http-errors");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if ("favorite" in req.body === false) {
    return next(createError(400, "missing field favorite"));
  } else {
    const contact = await Contact.findByIdAndUpdate(contactId, {
      favorite,
    });
    if (contact) {
      contact.favorite = favorite;
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
};

module.exports = updateStatus;
