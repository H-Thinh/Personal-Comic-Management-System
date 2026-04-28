const prisma = require("../prismaClient")


const createChapterById = async (comicId, data) => {
    const imageLinks = data.content
    const title = data.title;
    const order = data.order;

    return prisma.chapter.create({
        data: {
            title,
            order,
            content: JSON.stringify(imageLinks),
            comic: {
                connect: { id: comicId } // kết nối với id của Comic
            }
        }
    });
}

const getChapterByIdComic = async (comicId) => {
    const chapters = await prisma.chapter.findMany({
        where: { comicId },
    });

    // const nextChapter = await prisma.chapter.findFirst({
    //     where: {
    //         id,
    //         order: { gt: chapters.order }
    //     },
    //     orderBy: {}
    // })
    return chapters;
};

const getChapterDetailById = async (comicId, chapterId) => {
    const currentChapter = await prisma.chapter.findFirst({
        where: { comicId, id: chapterId },
        select: {
            id: true,
            comic: { select: { title: true } },
            content: true,
            order: true
        }
    });

    if (!currentChapter) return null;

    const nextChapter = await prisma.chapter.findFirst({
        where: {
            comicId,
            order: { gt: currentChapter.order },
        },
        select: { id: true, comicId: true },
        orderBy: { order: "asc" },
    });

    const prevChapter = await prisma.chapter.findFirst({
        where: {
            comicId,
            order: { lt: currentChapter.order },
        },
        select: { id: true, comicId: true },
        orderBy: { order: "desc" },
    });

    return {
        currentChapter: { id: currentChapter.id, nameComic: currentChapter.comic.title, content: currentChapter.content, order: currentChapter.order },
        nextChapter,
        prevChapter,
    };
};

const deleteChapterById = async (id) => {
    return prisma.chapter.delete({ where: { id } })
}

const updateChapterById = async (id, data) => {
    const chapterUpdated = await prisma.chapter.update({
        where: { id },
        data
    })

    if (!chapterUpdated) return null

    return chapterUpdated
}

const getChapterById = async (id) => {
    return await prisma.chapter.findFirst({ where: { id } })
}

module.exports = {
    createChapterById,
    getChapterByIdComic,
    deleteChapterById,
    updateChapterById,
    getChapterDetailById,
    getChapterById
}