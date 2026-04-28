const express = require("express");
const { VNPay } = require("vnpay"); // import từ thư viện
const config = require("../config/vnpay.config");

const vnpay = new VNPay({
    tmnCode: config.vnp_TmnCode,
    secureSecret: config.vnp_HashSecret,
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true,
});

const createVnPay = async (req, res) => {
    const { amount, orderId, orderInfo } = req.body;

    const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: amount * 100,
        vnp_IpAddr: req.ip,
        vnp_TxnRef: orderId.toString(),
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: "other",
        vnp_ReturnUrl: config.vnp_ReturnUrl,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
    });

    return res.json({
        code: "00",
        message: "Success",
        data: paymentUrl,
    });
}

const resultVnPay = async (req, res) => {
    const query = req.query;
    const check = vnpay.verifyReturnUrl(query);

    if (check.isVerified) {
        if (query.vnp_ResponseCode === "00") {
            return res.json({ success: true, message: "Thanh toán thành công" });
        } else {
            return res.json({ success: false, message: "Thanh toán thất bại" });
        }
    } else {
        return res
            .status(400)
            .json({ success: false, message: "Chữ ký không hợp lệ" });
    }
}

module.exports = {
    createVnPay,
    resultVnPay
}