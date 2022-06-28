const express = require("express");
const { ctrlUsers } = require("../../controller");
const { auth, upload } = require("../../middlewares");

const router = express.Router();

router.post("/signup", ctrlUsers.signup);

router.post("/login", ctrlUsers.login);

router.get("/logout", auth, ctrlUsers.logout);

router.get("/current", auth, ctrlUsers.current);

router.patch("/", auth, ctrlUsers.updateSubscription);

router.patch("/avatars", auth, upload.single("avatar"), ctrlUsers.avatars);

module.exports = router;
