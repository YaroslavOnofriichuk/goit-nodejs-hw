const {
  contactSchema: { joiContactSchema, Contact },
} = require("../../service");
const createError = require("http-errors");

const add = async (req, res, next) => {
  const { error } = joiContactSchema.validate({ ...req.body });
  const { _id } = req.user;

  if (error) {
    return next(createError(401, error.message));
  }

  const contact = await Contact.create({ ...req.body, owner: _id });

  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = add;
