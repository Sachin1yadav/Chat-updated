const catchAsyncError = require("../Middleware/catchAsyncError");
const Chat = require("../Models/chatModel");
const Message = require("../Models/messageModel");
const User = require("../Models/userModal");
const ErrorHandler = require("../Utils/ErrorHandler");

const grid = require('gridfs-stream');
const mongoose = require('mongoose');

let gfs, gridFsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    })
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

exports.sendMessage = catchAsyncError(async (req, res, next) => {
    const { content, chatId, type, isReply, replyContent, isDeleted } = req.body;

    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return next(new ErrorHandler("Something went wrong while sending the message", 400));
    }

    var newMessage = {
        sender: '64464c66a7918bce5dce5a22',
        content: content,
        replyContent: replyContent,
        isDeleted: isDeleted,
        type: type,
        isReply: isReply,
        chat: chatId
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name email',
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message,
        });

        res.json(message);
    } catch (error) {
        return next(new ErrorHandler("Error occured while sending the message", 500));
    }
})

exports.uploadFile = catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler("file not found", 404));
    }

    const url = "http://localhost:4000/api/v1";

    const imageUrl = `${url}/file/${req.file.filename}`
console.log("imgurl", imageUrl)
    return res.status(200).json(imageUrl);

})

exports.getFile = catchAsyncError(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return next(new ErrorHandler("error occured while getting file", 500));
    }
})

exports.allMessages = catchAsyncError(async (req, res, next) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name email").populate("chat");

        res.json(messages);
    } catch (error) {
        return next(new ErrorHandler("Error occured while fetching all the messages", 500));
    }
})

exports.deleteMessage = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const result = await Message.updateOne(
        { _id: id },
        { $set: { isDeleted: true } }
    );
    if (result.modifiedCount !== 1) {
        return next(new ErrorHandler("message not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        message: "message deleted successfully"
    })
})

exports.reactMessage = catchAsyncError(async (req, res, next) => {
    const { id, emoji } = req.body;

    const result = await Message.updateOne(
        { _id: id },
        { $set: { reaction: emoji } }
    );

    if (result.modifiedCount !== 1) {
        return next(new ErrorHandler("Message not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        message: "Reacted on message successfully"
    })
})

exports.unreactMessage = catchAsyncError(async (req,res,next)=>{
     
})

exports.getSingleMessage = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const message = await Message.findOne({ _id: id });

    if (!message) {
        return next(new ErrorHandler("message is not found with this id", 404));
    }

    res.status(200).json({
        success: true,
        Result: message
    })
})