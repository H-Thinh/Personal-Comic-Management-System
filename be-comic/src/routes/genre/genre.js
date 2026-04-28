const express = require('express');
const router = express.Router()
const genreController = require('../../controllers/genreController')
const { verifyAdmin, verifyToken } = require("../../middleware/verifyToken")

router.post('/add', verifyAdmin, genreController.createGenre)

router.get('/list', verifyToken, genreController.getGenre)

router.put('/update/:id', verifyAdmin, genreController.updateGenre)

router.get('/show/:id', verifyToken, genreController.getComicByIdGenre)

router.delete('/delete/:id', verifyAdmin, genreController.deleteGenre)

module.exports = router