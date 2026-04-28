const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;


        if (!token) return res.status(401).json({ message: "No token" })

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

            // {err} kiểm tra token sai, token đã hết hạn, secret không khớp, token bị sửa
            if (err) return res.status(401).json({ message: "Token invalid or expired" })

            req.user = decoded;
            next();
        })

    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role.toLowerCase() === "admin") next();
        else res.status(403).json({ error: "Admins only" });
    })
}

module.exports = {
    verifyAdmin,
    verifyToken
} 