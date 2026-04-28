const prisma = require("../prismaClient")

const createHistory = async (data) => {
    return prisma.history.create({ data })
}

const getHistoryByUserId = async (id) => {
    const historys = await prisma.history.findMany({
        where: { userId: id },
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
    })

    if (!historys) return null

    return historys.map(f => f.comic)
}

const getHistoryByIdUserAndIdComic = async (comicId, userId) => {
    return prisma.history.findFirst({
        where: { comicId, userId },
    })
}

module.exports = {
    createHistory,
    getHistoryByUserId,
    getHistoryByIdUserAndIdComic
}