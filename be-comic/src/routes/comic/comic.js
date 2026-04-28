const express = require('express');
const router = express.Router()
const comicController = require('../../controllers/comicController')
const { verifyAdmin, verifyToken } = require("../../middleware/verifyToken")

router.post('/add', verifyAdmin, comicController.uploadComic, comicController.createComic)

router.get('/show/:id', comicController.getComicById)

router.get('/list', comicController.getComics)

router.get('/listrank', comicController.getComicsByView)

router.put('/update/:id', verifyToken, comicController.uploadComic, comicController.updateComic)

router.get('/updateviews/:comicId/:userId', verifyToken, comicController.updateViewComic)

router.delete('/delete/:id', verifyToken, comicController.deleteComic)

router.get('/search', verifyToken, comicController.searchComic)

module.exports = router