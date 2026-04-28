const authorModel = require('../models/authorModel')

const createAuthor = async (req, res) => {
    const { name } = req.body

    const author = await authorModel.createAuthor({ name })

    res.json(author)
}

const getAuthors = async (req, res) => {
    const author = await authorModel.getAuthors()

    res.json(author)
}

const updateAuthor = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body

    const data = await authorModel.getAuthorById(id)

    const author = await authorModel.updateAuthor(id, { name: name || data.name })

    res.json(author)
}

const deleteAuthor = async (req, res) => {
    const id = parseInt(req.params.id);

    const getBooks = await authorModel.getBooksByIdAuthor(id);

    if (!getBooks) {
        return res.status(404).json({ message: "Tác giả không tồn tại." });
    }

    if (getBooks.sach.length > 0) {
        return res.status(400).json({ message: "Tác giả vẫn còn sách, không thể xóa." });
    }

    // Xóa tác giả
    await authorModel.deleteAuthor(id);

    return res.status(200).json({ message: "Xóa tác giả thành công." });
};


module.exports = {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthors
}