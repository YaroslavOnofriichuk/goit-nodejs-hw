const { joiSchema, Contact } = require("../service");

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({});
  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  console.log(contact);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = joiSchema.validate({ name, email, phone });

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    const contact = await Contact.create({ name, email, phone });
    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (contact) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = joiSchema.validate({ name, email, phone });

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

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatus,
};
