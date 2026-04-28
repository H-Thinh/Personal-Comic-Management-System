const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendVerificationEmail = async (email, link) => {

    await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Xác nhận email đăng ký tài khoản",
        html: `
      <h2>Chào bạn!</h2>
      <p>Nhấn vào liên kết dưới đây để xác nhận email của bạn:</p>
      <a href="${link}" target="_blank">${link}</a>
      <p>Liên kết này sẽ hết hạn sau 24 giờ.</p>
    `,
    });
};

module.exports = sendVerificationEmail