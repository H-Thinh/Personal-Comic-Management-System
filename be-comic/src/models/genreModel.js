const prisma = require("../prismaClient")


const createGenre = async (data) => {
    return prisma.genre.create({ data })
}

const updateGenre = async (id, data) => {
    return prisma.genre.update({ where: { id }, data })
}

const deleteGenre = async (id) => {
    return prisma.genre.delete({ where: { id } })
}

const getGenre = async () => {
    const genres = await prisma.genre.findMany();

    // Thêm "Genre: " vào tên
    const formattedGenres = genres.map(genre => ({
        id: genre.id,
        name: genre.name,
    }));

    return {
        Genre: formattedGenres,
    };
};


const getGenreById = async (id) => {
    const genre = await prisma.genre.findUnique({ where: { id } })

    if (!genre) return null

    return genre
}

const getComicByIdGenre = async (id) => {
    const genre = await prisma.genre.findUnique({
        where: { id },
        include: {
            comics:
            {
                select: {
                    comic: {
                        select: {
                            id: true,
                            title: true,
                            content: true,
                            chapters: true,
                            author: { select: { id: true, name: true } },
                            coverImage: true,
                            genres: { select: { genre: { select: { id: true, name: true } } } }
                        }
                    }
                }
            }
        }
    })

    if (!genre) return null

    const comics = genre.comics.map((comic) => {
        return { ...comic.comic, genres: comic.comic.genres.map((genre) => genre.genre) }
    })


    return { ...genre, comics }
}

module.exports = {
    createGenre,
    deleteGenre,
    getGenre,
    updateGenre,
    getGenreById,
    getComicByIdGenre
}