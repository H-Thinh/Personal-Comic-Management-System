const express = require('express');
const router = express.Router()
const authorController = require('../../controllers/authorController')
const { verifyAdmin } = require("../../middleware/verifyToken")

router.post("/add", verifyAdmin, authorController.createAuthor)

router.get("/list", verifyAdmin, authorController.getAuthors)

router.put("/update/:id", verifyAdmin, authorController.updateAuthor)

router.delete("/delete/:id", verifyAdmin, authorController.deleteAuthor)

module.exports = router