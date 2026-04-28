const express = require("express")
const router = express.Router()
const rateController = require("../../controllers/rateController")
const { verifyToken } = require("../../middleware/verifyToken");

router.post("/add", verifyToken, rateController.createRatingForComic)

router.get("/show/:id", verifyToken, rateController.getRatingByComicId)

router.get("/list", verifyToken, rateController.getRates)

router.put("/status/:id", verifyToken, rateController.UpdateStatusForRate)

module.exports = router

