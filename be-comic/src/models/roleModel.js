const prisma = require("../prismaClient")

const createRole = async ({ name }) => {
    return prisma.role.create({ data: { name, updatedAt: new Date() } })
}

const getRoles = async () => {
    return prisma.role.findMany({ select: { id: true, name: true } })
}

const updateRole = async (id, data) => {
    const role = await prisma.role.update({ where: { id }, data })

    if (!role) return null

    return role
}

const getRoleById = async (id) => {
    return prisma.role.findFirst({ where: { id } })
}

module.exports = {
    createRole,
    updateRole,
    getRoles,
    getRoleById
}