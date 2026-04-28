const adminValidation = ({ name, email, password, roleId }) => {
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

    if (!roleId) {
        errors.roleId = "Vui chọn vai trò"
    }

    return errors;
}

module.exports = adminValidation