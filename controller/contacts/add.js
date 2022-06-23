const {
  contactSchema: { joiContactSchema, Contact },
} = require("../../service");

const add = async (req, res, next) => {
  const { error } = joiContactSchema.validate({ ...req.body });
  const { _id } = req.user;

  if (error) {
    res.status(400).json({ message: error.message });
  }

  const contact = await Contact.create({ ...req.body, owner: _id });

  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = add;
