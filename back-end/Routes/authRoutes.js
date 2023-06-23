const express = require('express');
const { isAuthenticatedUser } = require('../Middleware/auth');

const router = express.Router();

router.get("/me", isAuthenticatedUser);




module.exports = router;