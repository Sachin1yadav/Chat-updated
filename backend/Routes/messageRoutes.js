const { sendMessage, allMessages, deleteMessage, uploadFile, getFile, getSingleMessage, reactMessage } = require('../Controller/messagesController');

const express = require('express');
const upload = require('../Middleware/upload');

const router = express.Router();

// For sending message
router.post("/message", sendMessage);

// For getting all the messages from  
router.get("/:chatId", allMessages);

// For getting a single message 

router.get("/message/:id", getSingleMessage);

// For deleting a message 
router.delete("/message/:id", deleteMessage);
// router.delete("/message", deleteMessage);
// react a message

router.post("/message/react", reactMessage);

// For uploading file

router.post("/file/upload", upload.single("file"), uploadFile);

// For accessing file from browser

router.get("/file/:filename", getFile);

module.exports = router;