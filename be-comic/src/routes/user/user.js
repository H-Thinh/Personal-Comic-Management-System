const express = require('express');
const router = express.Router()
const userController = require('../../controllers/userController')
const { verifyToken } = require("../../middleware/verifyToken")

router.get('/list/:id', verifyToken, userController.getUserById)

router.put('/update/:id', verifyToken, userController.updateUser)

router.get('/search', userController.searchUser)

module.exports = router
