const authorValidation = ({ name }) => {
    const errors = {};

    if (!name) {
        errors.name = "Vui lòng nhập tên tác giả"
    }

    return errors;
}

module.exports = authorValidation