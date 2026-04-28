const express = require('express');
const router = express.Router()
const followController = require('../../controllers/followController')
const { verifyToken } = require("../../middleware/verifyToken")

router.post('/toggle', verifyToken, followController.toggleFollow)

router.get('/show/:id', verifyToken, followController.getComicFollowedByIdUser)

router.get('/list/:id', verifyToken, followController.getListFollowedByIdUser)

module.exports = router