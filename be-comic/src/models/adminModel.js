const prisma = require("../prismaClient")

const getUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: {
                select: {
                    name: true
                }
            },
            upermission: {
                select: {
                    permission: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    return users.map((user) => ({
        ...user,
        role: user.role.name,
        upermission: user.upermission.map((u) => u.permission.name)
    }))
}

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            role: { select: { id: true } },
            upermission: {
                select: {
                    permission: { select: { id: true } }
                }
            }
        },
    })

    if (!user) return null;

    const { password, roleId, createdAt, updatedAt, status, ...rest } = user;

    return {
        ...rest,
        upermission: user.upermission.map(p => p.permission.id)
    };
}

const deletetUserById = async (id) => {
    await prisma.comment.deleteMany({
        where: { userId: id }
    });

    await prisma.rate.deleteMany({
        where: { userId: id }
    });

    await prisma.follow.deleteMany({
        where: { userId: id }
    });

    await prisma.history.deleteMany({
        where: { userId: id }
    });

    await prisma.userPermission.deleteMany({
        where: { userId: id }
    });

    return prisma.user.delete({ where: { id } })
}

const createUser = async ({ name, email, password, roleId, permissionIds }) => {
    const userNew = await prisma.user.create({
        data: {
            name,
            email,
            password,
            roleId,
            upermission: {
                create: permissionIds.map((id) => ({ permission: { connect: { id } } })),
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: { select: { name: true } },
            upermission: { select: { permission: { select: { name: true } } } },
        },
    });

    const { role, upermission } = userNew;

    return {
        ...userNew,
        role: role.name,
        upermission: upermission.map((p) => p.permission.name),
    };
};

const updatetUserById = async (id, { name, email, password, roleId, permissionIds }) => {
    const userUpdated = await prisma.user.update({
        where: { id }, data: {
            name,
            email,
            password,
            roleId,
            upermission: {
                deleteMany: {},
                create: permissionIds.map((id) => ({ permission: { connect: { id } } })),
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: { select: { name: true } },
            upermission: { select: { permission: { select: { name: true } } } },
        },
    })

    const { role, upermission } = userUpdated;

    return {
        ...userUpdated,
        role: role.name,
        upermission: upermission.map((p) => p.permission.name),
    };
}

module.exports = {
    getUsers,
    deletetUserById,
    getUserById,
    createUser,
    updatetUserById
}