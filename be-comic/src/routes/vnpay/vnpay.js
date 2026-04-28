const express = require('express');
const router = express.Router()
const vnpayController = require("../../services/payment.service")
// const { verifyToken } = require("../../middleware/verifyToken")

router.post('/add', vnpayController.createVnPay);

router.get("/payment-result", vnpayController.resultVnPay)


module.exports = router