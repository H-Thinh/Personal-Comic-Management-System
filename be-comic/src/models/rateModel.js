const prisma = require("../prismaClient")

const createRatingForComic = async (data) => {
    return prisma.rate.create({ data })
}

const getRatingByComicId = async (id) => {
    const rate = await prisma.rate.findMany({ where: { comicId: id } })

    if (!rate) return null

    return rate
}

const getRatingById = async (id) => {
    const rate = await prisma.rate.findFirst({ where: { id } })

    if (!rate) return null

    return rate
}

const checkUserRatedComic = async (userId, comicId) => {
    const existingRating = await prisma.rate.findFirst({ where: { userId: userId, comicId: comicId } })

    return existingRating
}

const UpdateStatusForRate = async (id, newStatus) => {
    return await prisma.rate.update({
        where: { id },
        data: { status: newStatus }
    })
}

const getRates = async () => {
    const rates = await prisma.rate.findMany({
        select: {
            id: true,
            comic: { select: { id: true, title: true } },
            user: { select: { id: true, name: true } },
            rating: true,
            status: true,
        }
    })

    return rates.map((rate) => {
        return {
            id: rate.id,
            comic: rate.comic,
            user: rate.user,
            rating: rate.rating,
            status: rate.status
        }
    })
}

module.exports = {
    createRatingForComic,
    getRatingByComicId,
    checkUserRatedComic,
    UpdateStatusForRate,
    getRates,
    getRatingById
}