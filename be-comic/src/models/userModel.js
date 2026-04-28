const prisma = require("../prismaClient")

const bcrypt = require("bcryptjs")

const createUser = async ({ name, email, password, roleId, permissionIds }) => {
    return prisma.user.create({
        data:
        {
            name,
            password,
            email,
            roleId,
            upermission: {
                create: permissionIds.map((permissionId) => ({
                    permission: {
                        connect: { id: permissionId }
                    }
                }))
            }
        },
    })
}

const getUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
        }
    })
}

const updatetUserById = async (id, data) => {
    return prisma.user.update({ where: { id }, data })
}

const updateVerifyEmail = async (email) => {
    return await prisma.user.update({
        where: { email },
        data: { isVerified: true },
    });
}

const checkEmail = async (email) => {
    const existingUser = await prisma.user.findFirst({ where: { email: email } })

    const error = {}

    if (existingUser) {
        error.email = "Email đã tồn tại"
    }

    return error
}

const checkName = async (name) => {
    const existingUser = await prisma.user.findFirst({ where: { name: name } })

    const error = {}

    if (existingUser) {
        error.name = "Name đã trùng"
    }

    return error
}

const checkLoginUser = async (data) => {
    const existingUser = await prisma.user.findFirst({
        where: {
            email: data.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: { select: { name: true } },
            password: true, // lấy password để so sánh
            upermission: {
                select: {
                    permission: {   // đi qua quan hệ Permission
                        select: { name: true }
                    }
                }
            },
            isVerified: true
        }
    });


    if (!existingUser) {
        return false;
    }

    const passwordMatch = await bcrypt.compare(data.password, existingUser.password);

    if (!passwordMatch) {
        return false;
    }

    return existingUser;
}

const searchUser = async (name) => {
    return prisma.user.findMany({
        where: {
            AND: [name ? { name: { contains: name } } : {}]
        }, take: 5,
        select: {
            id: true,
            name: true,
            email: true
        },
    })
}



module.exports = {
    createUser,
    updatetUserById,
    getUserById,
    checkEmail,
    checkName,
    checkLoginUser,
    searchUser,
    updateVerifyEmail
}