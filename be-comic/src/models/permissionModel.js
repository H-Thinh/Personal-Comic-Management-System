const prisma = require("../prismaClient")

const createPermission = async (data) => {
    return prisma.permission.create({ data })
}

const getPermissions = async () => {
    return prisma.permission.findMany({ select: { id: true, name: true } })
}

const updatePermission = async (id, data) => {
    const permissionUpdated = await prisma.permission.update({ where: { id }, data })

    if (!permissionUpdated) return null

    return permissionUpdated
}

const getPermissionById = async (id) => {
    return prisma.permission.findFirst({ where: { id } })
}

module.exports = {
    createPermission,
    getPermissions,
    updatePermission,
    getPermissionById
}