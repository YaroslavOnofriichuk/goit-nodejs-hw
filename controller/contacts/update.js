const {
  contactSchema: { joiContactSchema, Contact },
} = require("../../service");

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = joiContactSchema.validate({ name, email, phone });

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    const contact = await Contact.findByIdAndUpdate(contactId, {
      name,
      email,
      phone,
    });
    if (contact) {
      res.status(200).json({ name, email, phone, _id: contact._id });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
};

module.exports = update;
