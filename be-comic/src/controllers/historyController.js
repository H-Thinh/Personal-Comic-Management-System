const historyModel = require('../models/historyModel')
const userModel = require('../models/userModel')
const comicModel = require('../models/comicModel')
const chapterModel = require('../models/chapterModel')

const createHistory = async (req, res) => {

    const { userId, comicId, chapterId } = req.body;

    const userIdInt = parseInt(userId)
    const comicIdInt = parseInt(comicId)
    const chapterIdInt = parseInt(chapterId)

    const existingUser = await userModel.getUserById(userIdInt);
    if (Object.keys(existingUser) === 0) {
        return res.status(400).json({ message: "Không có user này" })
    }

    const existingComic = await comicModel.getComicById(comicIdInt);
    if (Object.keys(existingComic) === 0) {
        return res.status(400).json({ message: "Không có comic này" })
    }

    const existingChapter = await chapterModel.getChapterById(chapterIdInt);
    if (Object.keys(existingChapter) === 0) {
        return res.status(400).json({ message: "Không có chap này" })
    }

    const getChapter = await historyModel.getHistoryByIdUserAndIdComic(comicIdInt, userIdInt)
    const chapterOrder = getChapter ? getChapter.chapter : 0

    if (existingChapter.order <= chapterOrder) return

    const history = await historyModel.createHistory({ userId: userIdInt, comicId: comicIdInt, chapter: existingChapter.order });
    res.json(history);
}

const getHistoryByUserId = async (req, res) => {
    const id = parseInt(req.params.id)

    const history = await historyModel.getHistoryByUserId(id);

    res.json(history)
}

module.exports = {
    createHistory,
    getHistoryByUserId
}