const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

//UserController
router.get('/getAllUsers', UserController.getAllUsers) 
router.post('/userInsert', UserController.userInsert) 

module.exports = router