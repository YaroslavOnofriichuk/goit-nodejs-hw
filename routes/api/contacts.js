const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if (contacts) {
    res.status(200).json(contacts);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate({ name, email, phone });

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    const contact = await addContact({ name, email, phone });
    if (contact) {
      res.status(201).json(contact);
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = schema.validate({ name, email, phone });

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    const contact = await updateContact(contactId, { name, email, phone });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
