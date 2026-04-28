const express = require('express');
const router = express.Router()
const commentController = require("../../controllers/commentController")
const { verifyToken } = require("../../middleware/verifyToken")

router.post('/add', verifyToken, commentController.createComment);

router.get("/show/:comicId/:chapterId", verifyToken, commentController.getCommentsByChapter)

router.get("/list/:id", verifyToken, commentController.getCommentsByIdComic)

router.get("/list", verifyToken, commentController.getComments)

router.put("/status/:id", verifyToken, commentController.UpdateStatusForComment)


module.exports = router