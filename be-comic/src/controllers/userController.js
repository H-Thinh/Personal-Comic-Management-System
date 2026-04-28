const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userValidation = require('../validation/userValidation');
const sendVerificationEmail = require('../utils/mailer');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const errorsUser = userValidation({ name, email, password, roleIdInt });
    if (Object.keys(errorsUser).length > 0) {
        return res.status(400).json(errorsUser)
    }

    const checkName = await userModel.checkName(name);
    if (Object.keys(checkName).length > 0) {
        return res.status(409).json(checkName)
    }

    const checkEmail = await userModel.checkEmail(email);
    if (Object.keys(checkEmail).length > 0) {
        return res.status(409).json(checkEmail)
    }

    const passwordCrypto = await bcrypt.hash(password, 10)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h", });

    const verifyLink = `${process.env.APP_BASE_URL}/api/auth/verify-email?token=${token}`;

    await sendVerificationEmail(email, verifyLink);

    await userModel.createUser({ name, email, password: passwordCrypto, roleId: 1, permissionIds: [] });
    res.status(200).json({ message: "Đăng kí thành công" })
}

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)

    const user = await userModel.getUserById(id);
    res.json(user);
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email, password } = req.body;

    const errorsUser = userValidation({ name, email, password });
    if (Object.keys(errorsUser).length > 0) {
        return res.status(400).json(errorsUser)
    }

    const data = await userModel.getUserById(id);
    if (!data) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" })
    }

    const sameName = name === data.name;
    const sameEmail = email === data.email;
    const samePassword = !password;

    if (sameName && sameEmail && samePassword) {
        return res.status(400).json({ message: "Không có thay đổi nào được thực hiện" })
    }

    if (name !== data.name) {
        const existingName = await userModel.checkName(name);
        if (Object.keys(existingName).length > 0) {
            return res.status(409).json(existingName)
        }
    }

    if (email !== data.email) {
        const existingEmail = await userModel.checkEmail(email);
        if (Object.keys(existingEmail).length > 0) {
            return res.status(409).json(existingEmail)
        }
    }

    let passwordCrypto;
    if (password) {
        passwordCrypto = await bcrypt.hash(password, 10)
    }

    const user = await userModel.updatetUserById(id,
        {
            name: name,
            email: email,
            password: passwordCrypto,
            roleId: 2,
            permissionIds: []
        })
    res.json(user)
}

function createJWT(userId, username, role, permissions) {
    const token = jwt.sign({ userId, username, role, permissions }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

const loginUser = async (req, res) => {
    const data = req.body;

    const checkLogin = await userModel.checkLoginUser(data);
    if (!checkLogin.isVerified) {
        return res.status(400).json({ message: "Vui lòng xác thực email của bạn" });
    }

    if (!checkLogin) {
        return res.status(400).json({ message: "Nhập email hoặc mật khẩu lỗi" });
    }

    const permissions = checkLogin.upermission.map((per) => per.permission.name)

    const token = createJWT(checkLogin.id, checkLogin.name, checkLogin.role.name, permissions);

    res.cookie('token', token, {
        httpOnly: true,         //  Không cho JS đọc
        secure: false,          //  HTTP (localhost)
        sameSite: 'Lax',        //  Cho phép lưu khi khác origin
        maxAge: 15 * 60 * 60 * 1000,
    });

    res.json({
        message: 'Đăng nhập thành công',
        id: checkLogin.id,
        name: checkLogin.name,
        email: checkLogin.email,
        role: checkLogin.role.name
    });
};

const searchUser = async (req, res) => {

    const { name } = req.query;

    const users = await userModel.searchUser(name)
    res.json(users)
}

module.exports = {
    createUser,
    updateUser,
    getUserById,
    loginUser,
    searchUser
}