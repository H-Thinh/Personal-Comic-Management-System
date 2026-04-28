const express = require('express');
const router = express.Router()
const historyController = require('../../controllers/historyController')
const { verifyToken } = require("../../middleware/verifyToken")

router.post('/add', verifyToken, historyController.createHistory)

router.get('/show/:id', verifyToken, historyController.getHistoryByUserId)

module.exports = router