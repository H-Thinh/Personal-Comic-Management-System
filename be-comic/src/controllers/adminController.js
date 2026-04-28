const adminModel = require('../models/adminModel')
const permissionModel = require('../models/permissionModel')
const roleModel = require('../models/roleModel')
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const adminValidation = require('../validation/adminValidation');

const createUser = async (req, res) => {
    const { name, email, password, roleId, permissionIds } = req.body;

    const errorsAdmin = adminValidation({ name, email, password, roleId });
    if (Object.keys(errorsAdmin).length > 0) {
        return res.status(400).json(errorsAdmin)
    }

    const checkName = await userModel.checkName(name);
    if (Object.keys(checkName).length > 0) {
        return res.status(400).json(checkName)
    }

    const checkEmail = await userModel.checkEmail(email);
    if (Object.keys(checkEmail).length > 0) {
        return res.status(400).json(checkEmail)
    }

    let arrayPer;
    if (Array.isArray(permissionIds)) {
        arrayPer = permissionIds.map(Number);
    } else {
        arrayPer = JSON.parse(permissionIds);
    }

    const intLevel = parseInt(roleId)
    const existingRole = await roleModel.getRoleById(intLevel)
    if (Object.keys(existingRole) > 0) {
        return res.status(400).json({ message: "Không có role như vậy" })
    }

    const existingPermission = await permissionModel.getPermissionById(intLevel)
    if (Object.keys(existingPermission) > 0) {
        return res.status(400).json({ message: "Không có permission như vậy" })
    }

    const passwordCrypto = await bcrypt.hash(password, 10)

    const user = await adminModel.createUser({ name, email, password: passwordCrypto, roleId: intLevel, permissionIds: arrayPer })
    res.json(user)
}

const getUsers = async (req, res) => {

    const user = await adminModel.getUsers()
    res.json(user)
}

const updateUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email, password, roleId, permissionIds } = req.body;

    const errorsAdmin = adminValidation({ name, email, password, roleId });
    if (Object.keys(errorsAdmin).length > 0) {
        return res.status(400).json(errorsAdmin)
    }

    const data = await adminModel.getUserById(id);
    if (!data) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" })
    }

    const sameName = name === data.name;
    const sameEmail = email === data.email;
    const sameroleId = roleId === data.roleId;
    const samepermissionIds = permissionIds === data.permissionIds;
    const samePassword = !password;

    if (sameName && sameEmail && samePassword && sameroleId && samepermissionIds) {
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

    let arrayPer;
    if (Array.isArray(permissionIds)) {
        arrayPer = permissionIds.map(Number);
    } else {
        arrayPer = JSON.parse(permissionIds);
    }

    const intLevel = parseInt(roleId)

    const user = await adminModel.updatetUserById(id,
        {
            name: name,
            email: email,
            password: passwordCrypto,
            roleId: intLevel,
            permissionIds: arrayPer
        })
    res.json(user)
}

const deletetUserById = async (req, res) => {
    const id = parseInt(req.params.id)

    const data = await userModel.getUserById(id);
    if (!data) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" })
    }

    const user = await adminModel.deletetUserById(id)
    res.json(user)
}

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)

    const user = await adminModel.getUserById(id)
    res.json(user)
}

module.exports = {
    createUser,
    getUsers,
    deletetUserById,
    updateUserById,
    getUserById
}