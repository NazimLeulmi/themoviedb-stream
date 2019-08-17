const express = require("express");
const router = express.Router();

router.use("/signIn", require("./signIn"));
router.use("/signUp", require("./signUp"));
router.use("/stripe", require("./stripe"));

module.exports = router;