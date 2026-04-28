const roleModel = require("../models/roleModel")

const createRole = async (req, res) => {

    const { name } = req.body;

    const role = await roleModel.createRole({ name });

    res.json(role)
}

const getRoles = async (req, res) => {

    const roles = await roleModel.getRoles();
    res.json(roles)
}

const updateRole = async (req, res) => {

    const id = parseInt(req.params.id)

    const { name } = req.body;

    const role = await roleModel.updateRole(id, { name });

    res.json(role)
}

module.exports = {
    createRole,
    getRoles,
    updateRole
}