

const express = require("express");
const router = express.Router();
const { getMessages, addMessage } = require("../controllers/messageController.js");


router.post("/getmsg", getMessages);


router.post("/addmsg", addMessage);

module.exports = router;
