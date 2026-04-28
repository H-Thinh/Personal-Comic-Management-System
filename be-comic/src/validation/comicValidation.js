const comicValidation = ({ title, genreIds, content, authorID }, fileComic) => {
    const errors = {};

    if (!title) {
        errors.title = "Vui lòng nhập tên sách"
    }

    if (!genreIds) {
        errors.title = "Vui lòng chọn thể loại"
    }

    if (!content) {
        errors.title = "Vui lòng giới thiệu về sách"
    }

    if (!authorID) {
        errors.title = "Vui lòng nhập tác giả"
    }
    
    if (!fileComic) {
        errors.avatar = 'Vui lòng upload avatar';
    } else {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedFormats.includes(fileComic.mimetype)) {
            errors.avatar = 'Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF';
        }
        const maxSize = 1024 * 1024;
        if (fileComic.size > maxSize) {
            errors.avatar = 'Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB';
        }
    }

    return errors
}

module.exports = comicValidation