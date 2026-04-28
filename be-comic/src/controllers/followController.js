const followModel = require('../models/followModel')

const toggleFollow = async (req, res) => {
    const { userId, comicId } = req.body;

    const userIdInt = parseInt(userId)
    const comicIdInt = parseInt(comicId)

    const existingFollow = await followModel.getFollowByUserAndComic(userIdInt, comicIdInt)

    if (existingFollow) {
        await followModel.deleteFollow(userIdInt, comicIdInt)
        return res.status(200).json({ message: "Đã bỏ theo dõi truyện" });
    }

    await followModel.createFollow({ userId: userIdInt, comicId: comicIdInt });
    return res.status(200).json({ message: "Đã theo dõi truyện" });
}

const getComicFollowedByIdUser = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 18;

    const id = parseInt(req.params.id)

    const follow = await followModel.getComicFollowedByIdUser(id);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedComics = follow.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        total: follow.length,
        totalPages: Math.ceil(follow.length / limit),
        data: paginatedComics
    })
}

const getListFollowedByIdUser = async (req, res) => {

    const id = parseInt(req.params.id)

    const follow = await followModel.getListFollowedByIdUser(id);

    res.json(follow)
}

module.exports = {
    toggleFollow,
    getComicFollowedByIdUser,
    getListFollowedByIdUser
}