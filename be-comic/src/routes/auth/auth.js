const express = require("express");
const router = express.Router()
const authController = require("../../controllers/authController");
const userController = require("../../controllers/userController");
const { verifyToken } = require("../../middleware/verifyToken");

router.get("/logout", authController.logoutUser)

router.get("/verifytoken", verifyToken, authController.getInfoUser)

router.get("/verify-email", authController.verifyEmail);

router.post('/register', userController.createUser)

router.post('/login', userController.loginUser)

module.exports = router