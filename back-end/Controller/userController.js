const catchAsyncError = require("../Middleware/catchAsyncError");
const User = require("../Models/userModal");

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password
    })
    if (user) {
        res.status(201).json({
            success: true,
            user
        })
    }
})