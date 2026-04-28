const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")

const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
    });
    res.json({ message: "Đăng xuất thành công" });
};

const getInfoUser = (req, res) => {
    const user = req.user;

    res.json({ user: { name: user.username, role: user.role, id: user.userId }, message: "Token vẫn còn " });
}

const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) return res.status(400).json({ message: "Thiếu token xác nhận" });

    try {
        // ✅ Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await userModel.checkEmail(email);
        if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

        if (user.isVerified) {
            return res.status(200).json({ message: "Email đã được xác nhận trước đó" });
        }

        await userModel.updateVerifyEmail(email)
        console.log(user, { message: "Xác nhận email thành công!" });

        res.status(200).json({ message: "Xác nhận email thành công!" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Liên kết xác nhận đã hết hạn" });
        }
        res.status(400).json({ message: "Token không hợp lệ" });
    }
};

module.exports = {
    logoutUser,
    getInfoUser,
    verifyEmail
}