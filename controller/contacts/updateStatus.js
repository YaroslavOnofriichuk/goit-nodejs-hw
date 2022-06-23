const {
  contactSchema: { Contact },
} = require("../../service");

const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if ("favorite" in req.body === false) {
    res.status(400).json({ message: "missing field favorite" });
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
