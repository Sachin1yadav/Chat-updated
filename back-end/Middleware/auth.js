const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = (catchAsyncError(async (req, res, next) => {
    const userData = localStorage.getItem("userData");
    if (!userData) return next(new ErrorHandler("Please login for accessing this feature", 401));
    return res.status(200).json({
        success: true,
        message: userData
    })
}))