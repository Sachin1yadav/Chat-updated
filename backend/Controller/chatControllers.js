const catchAsyncError = require("../Middleware/catchAsyncError");
const Chat = require("../Models/chatModel");
const User = require("../Models/userModal");
const ErrorHandler = require("../Utils/ErrorHandler");

exports.accessChat = catchAsyncError(async (req, res, next) => {
    const { userId } = req.body;

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: '64464c66a7918bce5dce5a22' } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: ['64464c66a7918bce5dce5a22', userId]
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            return next(new ErrorHandler("Error occured", 500));
        }
    }
})

exports.fetchChats = catchAsyncError(async (req, res, next) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: '64464c66a7918bce5dce5a22' } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name email",
                });

                res.status(200).send(results);
            })
    } catch (error) {
        return next(new ErrorHandler("Error occured", 500));
    }
})