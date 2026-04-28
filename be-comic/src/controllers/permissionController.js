const permissionModel = require("../models/permissionModel")

const createPermission = async (req, res) => {
    const { name } = req.body;

    const permission = await permissionModel.createPermission({ name })
    res.json(permission)
}

const getPermissions = async (req, res) => {
    const permissions = await permissionModel.getPermissions()
    res.json(permissions)
}

const updatePermission = async (req, res) => {
    const { name } = req.body;
    const id = parseInt(req.params.id)
    const permission = await permissionModel.updatePermission(id, { name })
    res.json(permission)
}

module.exports = {
    createPermission,
    getPermissions,
    updatePermission
}