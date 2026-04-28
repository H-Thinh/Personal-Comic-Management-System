const comicModel = require('../models/comicModel')
const historyModel = require('../models/historyModel')
const multer = require('multer')
const slugify = require("slugify")
const cloudinary = require('../config/cloudinar.config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const comicValidation = require('../validation/comicValidation');

const createComic = async (req, res) => {
    const { title, genreIds, content, authorID } = req.body;

    const file = req.file
    const coverImage = file ? file.path : '';
    const slug = slugify(title, { lower: true, strict: true });

    const comicVa = comicValidation({ title, genreIds, content, authorID }, file)

    if (Object.keys(comicVa).length > 0) {
        return res.status(400).json(comicVa)
    }

    const intAuthor = parseInt(authorID)

    let arrayGen;
    if (Array.isArray(genreIds)) {
        arrayGen = genreIds.map(Number);

    } else {
        arrayGen = JSON.parse(genreIds);
    }

    const comic = await comicModel.createComic({ title, slug, authorId: intAuthor, views: 0, content, coverImage, genreIds: arrayGen });

    res.json(comic);
};

const updateComic = async (req, res) => {
    const id = parseInt(req.params.id);

    const getComicById = await comicModel.getComicById(id);
    if (!getComicById) {
        return res.status(404).json({ message: "Không tìm thấy sách" })
    }

    const { title, authorID, content } = req.body;

    let genreIds = req.body.genreIds;

    const data = await comicModel.getComicById(id);

    const coverImage = req.file ? req.file.path : data.coverImage;

    const intAuthor = parseInt(authorID)

    let arrGen;
    if (Array.isArray(genreIds)) {
        arrGen = genreIds.map(Number)
    } else {
        arrGen = JSON.parse(genreIds)
    }


    const comic = await comicModel.updateComic(id, {
        title: title || data.title,
        authorID: intAuthor || data.authorID,
        coverImage,
        content: content || data.content,
        genreIds: arrGen || data.genres.map(g => g.genre.id),
    });

    res.json(comic);
};


const getComicById = async (req, res) => {

    const id = parseInt(req.params.id)

    const comic = await comicModel.getComicById(id)
    if (!comic) {
        return res.status(404).json({ message: "Không tìm thấy sách" })
    }

    res.json(comic)
}

const deleteComic = async (req, res) => {
    const id = parseInt(req.params.id)

    const getComicById = await comicModel.getComicById(id);
    if (!getComicById) {
        return res.status(404).json({ message: "Không tìm thấy sách" })
    }

    await comicModel.deleteComic(id)
    res.json({ message: "Xóa thành công truyện" })
}

const getComics = async (req, res) => {

    const sort = req.query.sort || "time_asc"

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;

    const comics = await comicModel.getComics(sort);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedComics = comics.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        total: comics.length,
        totalPages: Math.ceil(comics.length / limit),
        data: paginatedComics
    });
}

const getComicsByView = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const comics = await comicModel.getComicsByView();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedComics = comics.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        total: comics.length,
        totalPages: Math.ceil(comics.length / limit),
        data: paginatedComics
    });
}

const searchComic = async (req, res) => {
    const { name } = req.query;

    const comics = await comicModel.searchComic(name)
    res.json(comics)
}

const updateViewComic = async (req, res) => {
    const userId = parseInt(req.params.userId)
    const comicId = parseInt(req.params.comicId)

    const comic = await comicModel.getComicById(comicId)
    if (!comic) {
        return res.status(404).json({ message: "Không tìm thấy sách" })
    }

    const checkUserAndComic = await historyModel.getHistoryByIdUserAndIdComic(comicId, userId)

    if (!checkUserAndComic) return

    await comicModel.updateViewComic(comicId)
    res.json({ message: "tang view" })
}

const coverImage = new CloudinaryStorage({
    cloudinary: cloudinary, // cấu hình cloudinary đã được import
    params: {
        folder: 'coverImage', // ảnh được lưu vào folder này
        allowed_formats: ['jpg', 'png', 'jpeg'], // định dạng cho phép
        public_id: (req, file) => {
            const name = file.originalname
                .split('.')[0]
                .replace(/\s+/g, '_')
                .toLowerCase();
            return `${name}_${Date.now()}`; // tạo public_id duy nhất
        },
    },
});

const uploadComic = multer({ storage: coverImage }).single('coverImage');

module.exports = {
    createComic,
    uploadComic,
    getComicById,
    updateComic,
    deleteComic,
    getComics,
    searchComic,
    updateViewComic,
    getComicsByView
}