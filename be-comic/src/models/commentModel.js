const prisma = require("../prismaClient")


const createComment = async (data) => {
    const commented = await prisma.comment.create({
        data,
        select: {
            id: true,
            user: { select: { id: true, name: true } },
            chapter: { select: { order: true } },
            status: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            parentId: true,
        }
    })

    const { id, parentId, status, user, chapter, content, createdAt, updatedAt } = commented

    return {
        id,
        nameUser: user.name,
        chapter: chapter.order,
        parentId,
        status,
        content,
        createdAt,
        updatedAt,
    }
}

const getCommentsByIdComic = async (id) => {
    const comments = await prisma.comment.findMany({
        where: {
            comicId: id,
            parentId: null,
            status: "active",
        },
        select: {
            id: true,
            user: { select: { id: true, name: true } },
            chapterId: true,
            status: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            replies: {
                select: {
                    id: true,
                    user: { select: { id: true, name: true } },
                    chapterId: true,
                    status: true,
                    content: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    })

    if (!comments) return null

    return comments.map((comment) => {

        const { id, parentId, status, chapterId, content, createdAt, updatedAt, replies } = comment

        return {
            id, nameUser: comment.user.name, chapterId, parentId, status, content, createdAt, updatedAt, replies:
                replies.map((children) => {

                    const { id, parentId, status, chapterId, content, createdAt, updatedAt } = children

                    return { id, nameUser: children.user.name, chapterId, parentId, status, content, createdAt, updatedAt }
                })
        }
    })
}

const getCommentsByChapter = async (idComic, idChapter) => {
    const comments = await prisma.comment.findMany({
        where: { comicId: idComic, chapterId: idChapter, parentId: null, status: "active" },
        select: {
            id: true,
            content: true,
            user: { select: { name: true } },
            chapter: { select: { order: true } },
            parentId: true,
            status: true,
            updatedAt: true,
            replies: {
                select: {
                    id: true,
                    content: true,
                    user: { select: { name: true } },
                    chapter: { select: { order: true } },
                    parentId: true,
                    status: true,
                    updatedAt: true,
                }
            }
        }
    })

    if (!comments) return null

    return comments.map((comment) => {

        const { id, content, user, chapter, parentId, status, updatedAt, replies } = comment

        return {
            id, content, nameUser: user.name, chapter: chapter.order, parentId, status, updatedAt, replies: replies.map((children) => {

                const { id, parentId, status, chapter, user, content, createdAt, updatedAt } = children

                return { id, nameUser: user.name, chapter: chapter?.order ?? null, parentId, status, content, createdAt, updatedAt }
            })
        }
    })
}

const getComments = async () => {
    const comments = await prisma.comment.findMany({
        select: {
            id: true,
            comic: { select: { id: true, title: true } },
            user: { select: { id: true, name: true } },
            parentId: true,
            content: true,
            status: true,
            chapterId: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return comments.map((comment) => {

        const { id, status, content, chapterId, createdAt, updatedAt, parentId } = comment

        return {
            id,
            user: comment.user,
            comic: comment.comic,
            chapterId,
            parentId,
            content,
            status,
            createdAt,
            updatedAt
        }
    })
}

const getCommentById = async (id) => {
    const comment = await prisma.comment.findFirst({ where: { id } })

    if (!comment) return null

    return comment
}

const UpdateStatusForComment = async (id, newStatus) => {
    return await prisma.comment.update({
        where: { id },
        data: { status: newStatus }
    })
}

module.exports = {
    createComment,
    getCommentsByIdComic,
    getCommentsByChapter,
    getComments,
    getCommentById,
    UpdateStatusForComment,
}