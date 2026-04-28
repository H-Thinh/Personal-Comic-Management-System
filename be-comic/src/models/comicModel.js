const prisma = require("../prismaClient")


const createComic = async ({ title, slug, authorId, views, content, coverImage, genreIds }) => {
    const comicNew = await prisma.comic.create({
        data: {
            content,
            title,
            slug,
            author: { connect: { id: authorId } },
            coverImage,
            views,
        },
        select: {
            id: true,
            title: true,
            coverImage: true,
            author: { select: { id: true, name: true } },
        }
    });

    if (genreIds.length > 0) {
        await prisma.comicGenre.createMany({
            data: genreIds.map((genreId) => ({ comicId: comicNew.id, genreId: genreId })),
            skipDuplicates: true, // bỏ qua record trùng lặp
        })
    }

    return comicNew;
};

const updateComic = async (id, { title, authorID, coverImage, content, genreIds } = {}) => {
    const comicUpdated = await prisma.comic.update({
        where: { id },
        data: {
            title,
            author: {
                connect: { id: authorID }
            },
            content,
            coverImage,
            genres: {
                deleteMany: {},
                create: genreIds.map((genreId) => ({
                    genre: {
                        connect: { id: genreId }
                    }
                }))
            }
        },
        select: {
            id: true,
            title: true,
            content: true,
            coverImage: true,
            author: {
                select: { id: true, name: true }
            },
            genres: {
                select: {
                    genre: {
                        select: { id: true, name: true }
                    }
                }
            }
        }
    })

    const getGenres = comicUpdated.genres.map((genre) => { return { id: genre.genre.id, name: genre.genre.name } })

    return { ...comicUpdated, genres: getGenres }
}

const deleteComic = async (id) => {

    return prisma.comic.delete({ where: { id } })
}

const getComicById = async (id) => {
    const comic = await prisma.comic.findFirst({
        where: { id },
        select: {
            id: true,
            title: true,
            slug: true,
            content: true,
            coverImage: true,
            genres: { select: { genre: true } },
            author: { select: { id: true, name: true } },
            chapters: true,
            rates: {
                where: { status: "active" },
                select: { id: true, rating: true },
            },
        },
    });

    if (!comic) return null;

    const genreNew = comic.genres.map((genre) => ({
        id: genre.genre.id,
        name: genre.genre.name,
    }));

    return { ...comic, genres: genreNew };
};


const getComics = async (sort) => {

    let orderBy = {};

    switch (sort) {
        case "view_asc":
            orderBy = { views: "asc" };
            break;
        case "view_desc":
            orderBy = { views: "desc" };
            break;
        case "time_asc":
            orderBy = { updatedAt: "asc" };
            break;
        case "time_desc":
        default:
            orderBy = { updatedAt: "desc" };
            break;
    }

    const comics = await prisma.comic.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            content: true,
            views: true,
            author: { select: { id: true, name: true } },
            genres: {
                select: {
                    genre: { select: { id: true, name: true } }
                }
            },
            chapters: {
                select: { id: true, title: true }
            },
        },
        orderBy
    });

    if (!comics) return null

    return comics.map(comic => {

        const { updatedAt, createdAt, ...rest } = comic;
        return {
            ...rest,
            genres: comic.genres.map(g => { return { id: g.genre.id, name: g.genre.name } })
        }
    });
};

const getComicsByView = async (sort) => {

    const comics = await prisma.comic.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            content: true,
            views: true,
            author: { select: { id: true, name: true } },
            genres: {
                select: {
                    genre: { select: { id: true, name: true } }
                }
            },
            chapters: {
                select: { id: true, title: true }
            },
            rates: { select: { rating: true, status: true } }
        },
        orderBy: { views: "desc" }
    });

    if (!comics) return null

    return comics.map(comic => {

        const { updatedAt, createdAt, ...rest } = comic;
        return {
            ...rest,
            genres: comic.genres.map(g => { return { id: g.genre.id, name: g.genre.name } })
        }
    });
};

const searchComic = async (name) => {
    return prisma.comic.findMany({
        where: {
            AND: [name ? { title: { contains: name } } : {}]
        },
        take: 5,
    })
}

const updateViewComic = async (id) => {
    const comic = await prisma.comic.findFirst({
        where: { id },
    })

    return prisma.comic.update({
        where: { id },
        data: { views: comic.views + 1 }
    })
}

module.exports = {
    getComics,
    createComic,
    updateComic,
    deleteComic,
    getComicById,
    updateViewComic,
    getComicsByView,
    searchComic,
}