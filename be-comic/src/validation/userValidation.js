const userValidation = ({ name, email, password, file }) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!name) {
        errors.name = "Vui lòng nhập name"
    }

    if (!email) {
        errors.email = "Vui lòng nhập email"
    }

    if (!regex.test(email)) {
        errors.email = "Vui lòng nhập đúng định dạng"
    }

    if (!password) {
        errors.password = "Vui lòng nhập mật khẩu"
    }

    // if (!file) {
    //     errors.avatar = 'Vui lòng upload avatar';
    // } else {
    //     const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    //     if (!allowedFormats.includes(file.mimetype)) {
    //         errors.avatar = 'Định dạng file không hợp lệ. Chỉ chấp nhận JPEG, PNG hoặc GIF';
    //     }
    //     const maxSize = 1024 * 1024;
    //     if (file.size > maxSize) {
    //         errors.avatar = 'Dung lượng file quá lớn. Vui lòng chọn file có dung lượng nhỏ hơn 1MB';
    //     }
    // }
    return errors;
}

module.exports = userValidation