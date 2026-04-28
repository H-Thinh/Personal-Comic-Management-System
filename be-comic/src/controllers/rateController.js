const rateModel = require("../models/rateModel")
const userModel = require("../models/userModel")
const comicModel = require("../models/comicModel")

const createRatingForComic = async (req, res) => {
    const { comicId, userId, rating } = req.body

    const intComic = parseInt(comicId)
    const intUser = parseInt(userId)
    const rated = parseInt(rating)

    const existingUser = await userModel.getUserById(intUser)
    if (!existingUser) {
        return res.status(400).json({ messeage: "Người dùng chưa đánh giá" })
    }

    const existingComic = await comicModel.getComicById(intComic)
    if (!existingComic) {
        return res.status(400).json({ messeage: "Không tìm thấy sách" })
    }

    if (rated <= 0 || rated >= 6) {
        return res.status(400).json({ messeage: "Vui lòng đánh giá từ 1 - 5" })
    }

    const checkUserRated = await rateModel.checkUserRatedComic(intUser, intComic)
    if (checkUserRated) {
        return res.status(401).json({ messeage: "Bạn đã đánh giá rồi" })
    }

    const rate = await rateModel.createRatingForComic({ comicId: intComic, userId: intUser, rating: rated })
    res.json(rate)
}

const getRatingByComicId = async (req, res) => {

    const id = parseInt(req.params.id)

    const rate = await rateModel.getRatingByComicId(id)

    res.json(rate)
}

const UpdateStatusForRate = async (req, res) => {
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
    const rate = await rateModel.getRatingById(id);

    const newStatus = rate.status === "active" ? "inactive" : "active";

    const rateUpdated = await rateModel.UpdateStatusForRate(id, newStatus)
    res.status(200).json({ status: rateUpdated.status, messeage: "Đã cập nhật lại đánh giá" })
}

const getRates = async (req, res) => {
    const rates = await rateModel.getRates()
    res.json(rates)
}

module.exports = {
    createRatingForComic,
    getRatingByComicId,
    UpdateStatusForRate,
    getRates
}