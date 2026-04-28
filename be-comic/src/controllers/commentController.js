const userModel = require("../models/userModel")
const comicModel = require("../models/comicModel")
const commentModel = require("../models/commentModel")
const chapterModel = require("../models/chapterModel")

const createComment = async (req, res) => {
    const { comicId, userId, content, parentId, chapterId } = req.body

    const intComicId = parseInt(comicId)
    const intUserId = parseInt(userId)
    const intParentId = parseInt(parentId)
    const intChapterId = parseInt(chapterId)

    const existingUser = await userModel.getUserById(intUserId)
    if (!existingUser) {
        return res.status(400).json({ messeage: "Không có người dùng này" })
    }

    const existingComic = await comicModel.getComicById(intComicId)
    if (!existingComic) {
        return res.status(400).json({ messeage: "Không tìm thấy sách" })
    }

    if (intChapterId !== null && !isNaN(intChapterId)) {
        const existingChapter = await chapterModel.getChapterById(intChapterId);

        if (!existingChapter) {
            return res.status(400).json({ message: "Không có chapter này" });
        }

        if (existingChapter.comicId !== intComicId) {
            return res.status(400).json({ message: "Truyện và chapter không trùng" });
        }
    }

    const comment = await commentModel.createComment({ comicId: intComicId, userId: intUserId, content, chapterId: intChapterId, parentId: intParentId })
    res.json(comment)
}

const getCommentsByChapter = async (req, res) => {
    const comicId = parseInt(req.params.comicId);
    const chapterId = parseInt(req.params.chapterId);

    const intComicId = parseInt(comicId)
    const intChapterId = parseInt(chapterId)

    const comments = await commentModel.getCommentsByChapter(intComicId, intChapterId)
    res.json(comments)
}

const getCommentsByIdComic = async (req, res) => {
    const idComic = parseInt(req.params.id)

    const comments = await commentModel.getCommentsByIdComic(idComic)
    res.json(comments)
}

const getComments = async (req, res) => {
    const rates = await commentModel.getComments()
    res.json(rates)
}

const UpdateStatusForComment = async (req, res) => {
    const id = parseInt(req.params.id)

    const { comicId, userId } = req.body;

    const intComic = parseInt(comicId)
    const intUser = parseInt(userId)

    const existingUser = await userModel.getUserById(intUser)
    if (!existingUser) {
        return res.status(400).json({ messeage: "Người dùng chưa đánh giá" })
    }

    const existingComic = await comicModel.getComicById(intComic)
    if (!existingComic) {
        return res.status(400).json({ messeage: "Không tìm thấy sách" })
    }
    const rate = await commentModel.getCommentById(id);

    const newStatus = rate.status === "active" ? "inactive" : "active";

    const rateUpdated = await commentModel.UpdateStatusForComment(id, newStatus)
    res.status(200).json({ status: rateUpdated.status, messeage: "Đã cập nhật lại comment" })
}


module.exports = {
    createComment,
    getCommentsByChapter,
    getCommentsByIdComic,
    getComments,
    UpdateStatusForComment
}