const chapterModel = require('../models/chapterModel')
const comicModel = require('../models/comicModel')
const multer = require('multer')
const cloudinary = require('../config/cloudinar.config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const chapterValidation = require('../validation/chapterValidation');

const createChapterById = async (req, res) => {

    const id = parseInt(req.params.id)

    const comicId = await comicModel.getComicById(id)

    if (!comicId) {
        return res.status(404).json({ message: "Không có truyện này" })
    }

    const files = req.files;

    const { title } = req.body;
    const { order } = req.query

    const chapterVa = chapterValidation({ title, order }, files)
    if (Object.keys(chapterVa).length > 0) {
        return res.status(400).json(chapterVa)
    }
    let arrayImage = []

    const chapterID = parseInt(order)

    if (files) {
        Object.keys(files).map((key, i) => {
            arrayImage.push(files[key].path);
        })
    }

    arrayImage = JSON.stringify(arrayImage)

    const chapter = await chapterModel.createChapterById(id, { title, content: arrayImage, order: chapterID });
    res.json(chapter)
}

const getChapterByIdComic = async (req, res) => {
    const id = parseInt(req.params.id);

    const chapter = await chapterModel.getChapterByIdComic(id);
    res.json(chapter)
}

const getChapterDetailById = async (req, res) => {
    const comicId = parseInt(req.params.comicId);
    const chapterId = parseInt(req.params.chapterId);

    const chapter = await chapterModel.getChapterDetailById(comicId, chapterId);
    res.json(chapter)
}

const deleteChapterById = async (req, res) => {
    const id = parseInt(req.params.id)

    const chapter = await chapterModel.deleteChapterById(id);
    res.json(chapter)
}

const updateChapterById = async (req, res) => {
    const id = parseInt(req.params.id);
    const files = req.files;
    const { title, order } = req.body;
    const orderInt = parseInt(order);
    var arrayImage = []

    if (files) {
        Object.keys(files).map((key, i) => {
            const file = files[key]
            arrayImage.push(file.filename);
        })
    }
    const data = await chapterModel.getChapterById(id)

    const content = arrayImage.length > 0 ? JSON.stringify(arrayImage) : data.content;

    const chapter = await chapterModel.updateChapterById(
        id,
        {
            title: title || data.title,
            content: content,
            order: orderInt || data.order
        });
    res.json(chapter)
}

const imageChapterStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        const name = file.originalname
            .split('.')[0] // cắt chuỗi và lấy cái đầu tiên
            .replace(/\s+/g, '_') // thay khoảng trống = dấu _
            .toLowerCase(); // chuyển thành chữ thường
        return {
            folder: req.folderPath || 'default_folder',
            allowed_formats: ['jpg', 'png', 'jpeg'],
            public_id: `${name}_${Date.now()}`,
        };
    },
});

const upload = multer({ storage: imageChapterStorage }).array('ChapterComic');

module.exports = {
    upload,
    createChapterById,
    updateChapterById,
    deleteChapterById,
    getChapterByIdComic,
    getChapterDetailById
}
