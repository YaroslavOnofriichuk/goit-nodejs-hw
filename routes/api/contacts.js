const express = require("express");
const { ctrlContacts } = require("../../controller");

const router = express.Router();

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", ctrlContacts.add);

router.delete("/:contactId", ctrlContacts.remove);

router.put("/:contactId", ctrlContacts.update);

router.patch("/:contactId/favorite", ctrlContacts.updateStatus);

module.exports = router;
