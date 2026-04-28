function checkPermission(permission) {
    return (req, res, next) => {
        const user = req.user;

        if (!user || !user.permissions.includes(permission)) {
            return res.status(403).json({ message: "Không có đủ quyền hạn truy cập" });
        }
        next();
    };
}

module.exports = checkPermission