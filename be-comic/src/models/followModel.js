const prisma = require("../prismaClient")


const createFollow = async (data) => {
    return prisma.follow.create({ data })
}

const deleteFollow = async (userId, comicId) => {
    return prisma.follow.delete({
        where: {
            userId_comicId: { userId, comicId }
        }
    })
}

const getComicFollowedByIdUser = async (userId) => {

    const comic = await prisma.follow.findMany({
        where: { userId },
        select: {
            comic: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    chapters: true,
                    author: { select: { id: true, name: true } },
                    coverImage: true,
                }
            }
        },
        orderBy: { comic: { updatedAt: 'desc' } }
    })

    return comic.map((c) => c.comic)
}

const getListFollowedByIdUser = async (userId) => {
    const listFollowed = await prisma.follow.findMany({
        where: { userId },
    })

    return listFollowed.map((follow) => follow.comicId)
}

const getFollowByUserAndComic = async (userId, comicId) => {
    return await prisma.follow.findFirst({
        where: {
            userId: userId,
            comicId: comicId
        }
    });
};


module.exports = {
    getFollowByUserAndComic,
    createFollow,
    deleteFollow,
    getComicFollowedByIdUser,
    getListFollowedByIdUser
}