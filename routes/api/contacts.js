const express = require("express");
const { ctrlContacts } = require("../../controller");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlContacts.getAll);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", auth, ctrlContacts.add);

router.delete("/:contactId", ctrlContacts.remove);

router.put("/:contactId", ctrlContacts.update);

router.patch("/:contactId/favorite", ctrlContacts.updateStatus);

module.exports = router;
