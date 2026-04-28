const express = require("express");
const router = express.Router();
const adminController = require('../../controllers/adminController')
const roleController = require('../../controllers/roleController')
const permissionController = require('../../controllers/permissionController')
const { verifyAdmin } = require("../../middleware/verifyToken");
const checkPermission = require("../../middleware/checkPermission");

router.get('/list', verifyAdmin, adminController.getUsers)

router.post('/register', adminController.createUser)

router.put('/update/:id', verifyAdmin, adminController.updateUserById)

router.get('/show/:id', verifyAdmin, adminController.getUserById)

router.delete('/delete/:id', verifyAdmin, adminController.deletetUserById)

// vai trò của user
router.post('/role/add', verifyAdmin, roleController.createRole)

router.get('/role/list', verifyAdmin, roleController.getRoles)

router.put('/role/update/:id', verifyAdmin, roleController.updateRole)

// Quyền của user
router.post("/permission/add", verifyAdmin, permissionController.createPermission)

router.get("/permission/list", verifyAdmin, permissionController.getPermissions)

router.put("/permission/update/:id", verifyAdmin, permissionController.updatePermission)

module.exports = router