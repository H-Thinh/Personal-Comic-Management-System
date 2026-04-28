const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth/auth")) // xong

router.use('/rate', require('./rate/rate')) // xong

router.use('/user', require('./user/user')) // xong

router.use('/admin', require('./admin/admin')) // xong

router.use('/genre', require('./genre/genre')) // xong

router.use('/comic', require('./comic/comic')) // xong

router.use('/follow', require('./follow/follow')) // xong

router.use('/author', require('./author/author')) // xong

router.use('/history', require('./hitory/hitory')) // xong

router.use('/chapter', require('./chapter/chapter')) // xong

router.use('/comment', require("./comment/comment")) // xong

router.use('/vnpay', require("./vnpay/vnpay")) // xong

module.exports = router