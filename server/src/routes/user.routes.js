const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// POST /api/v1/register
router.post("/register", userController.register);

module.exports = router;
