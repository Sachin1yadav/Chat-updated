const express = require('express');
const { accessChat, fetchChats } = require('../Controller/chatControllers');

const router = express.Router();

router.post("/chat", accessChat);   // create or access new chat.
router.get("/chats", fetchChats);   // fetching all the chats for a user.

module.exports = router;