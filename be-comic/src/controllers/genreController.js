const genreController = require('../models/genreModel')

const createGenre = async (req, res) => {

    const { name } = req.body;

    const genre = await genreController.createGenre({ name })

    res.json({ genre, message: "Thêm thành công", type: "success" })
}

const deleteGenre = async (req, res) => {

    const id = parseInt(req.params.id)

    await genreController.deleteGenre(id)
    res.json({ message: "Xóa thành công" })
}

const updateGenre = async (req, res) => {

    const id = parseInt(req.params.id)

    const getGenreById = genreController.getGenreById(id);

    const { name } = req.body;

    const genre = await genreController.updateGenre(id, { name: getGenreById.name || name })

    res.json(genre)

}

const getGenre = async (req, res) => {
    const genre = await genreController.getGenre()
    res.json(genre)
}

const getGenreById = async (req, res) => {
    const id = parseInt(req.params.id)

    const genre = await genreController.getGenreById(id)
    res.json(genre)
}

const getComicByIdGenre = async (req, res) => {
    const id = parseInt(req.params.id)

    const genre = await genreController.getComicByIdGenre(id)
    res.json(genre)
}

module.exports = {
    createGenre,
    deleteGenre,
    getGenre,
    updateGenre,
    getGenreById,
    getComicByIdGenre
}