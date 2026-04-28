const chapterValidation = ({ title, order }, files) => {
    const errors = {}

    if (!title) {
        errors.title = "Vui lòng nhập tên chương"
    }

    if (!order) {
        errors.title = "Vui lòng nhập thứ tự chap"
    }

    return errors
}

module.exports = chapterValidation