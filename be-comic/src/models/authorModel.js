const prisma = require("../prismaClient")


const createAuthor = async (data) => {
    return prisma.author.create({ data })
}

const updateAuthor = async (id, data) => {
    return prisma.author.update({ where: { id }, data })
}

const deleteAuthor = async (id) => {
    return prisma.author.delete({ where: { id } })
}

const getAuthors = async () => {
    return prisma.author.findMany()
}

const getAuthorById = async (id) => {

    const author = await prisma.author.findFirst({ where: { id } })

    if (!author) return null

    return author
}

const getBooksByIdAuthor = async (id) => {
    const booksByIdAuthor = await prisma.author.findFirst({
        where: { id },
        // include: {
        //     comics: true, // để lấy luôn danh sách sách của tác giả đó
        // },
    });

    if (!booksByIdAuthor) return null

    return booksByIdAuthor
};


module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthors,
    getAuthorById,
    getBooksByIdAuthor
}