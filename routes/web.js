const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const {ChangeUserAuth} = require('../middleware/auth')
const ProductController = require('../controllers/ProductController')
const CategoryController = require('../controllers/CategoryController')
const SliderController = require('../controllers/SliderController')
const PaymentController = require('../controllers/PaymentController')
const OrderController = require('../controllers/OrderController')

//UserController
router.get('/getAllUsers', UserController.getAllUsers)
router.get('/admin/getUser/:id', UserController.getSingleUser) 
router.post('/userInsert', UserController.userInsert) 
router.post('/verifyLogin', UserController.loginUser)
router.get('/logout', UserController.logout)
router.post('/updatePassword', ChangeUserAuth, UserController.updatePassword)
router.post('/updateProfile', ChangeUserAuth, UserController.updateProfile)
router.get('/me', ChangeUserAuth, UserController.getUserDetail)
router.get('/admin/deleteUser/:id', UserController.deleteUser)

// CategoryController
router.post('/categoryInsert', CategoryController.insertCategory)
router.get('/getCategory', CategoryController.categoryDisplay)
router.get('/viewCategory/:id', CategoryController.categoryView)
router.post('/updateCategory/:id', CategoryController.updateCategory)
router.get('/deleteCategory/:id', CategoryController.deleteCategory)

// ProductController
router.get('/products', ProductController.getAllProducts)
router.get('/getProductDetail/:id', ProductController.getProductDetail)
router.get('/product/getAdminProduct', ProductController.getAdminProduct)
router.get('/product/deleteProduct/:id', ProductController.deleteProduct)
router.post('/product/create', ProductController.createProduct)
router.post('/product/updateProduct/:id', ProductController.updateProduct)

// SliderController
router.get('/displaySlider', SliderController.displaySlider)
router.post('/insertSlider', SliderController.insertSlider)
router.get('/viewSlider/:id', SliderController.viewSlider)
router.post('/updateSlider/:id', SliderController.updateSlider)
router.get('/deleteSlider/:id', SliderController.deleteSlider)

// PaymentController
router.post('/payment/process', PaymentController.processPayment)
router.get('/stripeapiKey', PaymentController.sendStripeApiKey)

//OrderController
router.post('/order/create',ChangeUserAuth, OrderController.newOrder)
router.get('/order/getSingleOrder/:id',ChangeUserAuth, OrderController.getSingleOrder)
router.get('/order/myOrder',ChangeUserAuth, OrderController.myOrder)
router.get('/order/getAllOrders',ChangeUserAuth, OrderController.getAllOrders)
router.get('/order/deleteOrder/:id', ChangeUserAuth,OrderController.deleteOrder)

module.exports = router