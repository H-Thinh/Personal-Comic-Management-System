const express = require('express');
const router = express.Router()
const chapterController = require('../../controllers/chapterController')
const setUploadFolderPath = require("../../middleware/setUploadFolderPath")
const { verifyAdmin, verifyToken } = require("../../middleware/verifyToken")

router.post('/add/:id', verifyAdmin, setUploadFolderPath, chapterController.upload, chapterController.createChapterById)

router.get('/show/:id', verifyToken, chapterController.getChapterByIdComic)

router.get('/list/:comicId/:chapterId', verifyToken, chapterController.getChapterDetailById)

router.put('/update/:id', verifyAdmin, setUploadFolderPath, chapterController.upload, chapterController.updateChapterById)

router.delete('/delete/:id', verifyAdmin, chapterController.deleteChapterById)

module.exports = router