const express=require('express');
const router=express.Router();

//user Controller
const userController=require('../controllers/users');

//Product Controller
const productController=require('../controllers/product');

//Order COntroller
const orderController=require('../controllers/order');

// Middlewares
const authMiddleware = require('../middleware/middleware');

router.route('/createuser').post(authMiddleware,userController.createUser);

router.route('/signin').get(userController.userSignIn);

router.route('/createproduct').post(authMiddleware,productController.createproduct);

router.route('/getproducts').get(authMiddleware,productController.getProducts);

router.route('/getorder').get(authMiddleware,orderController.getOrders);

router.route('/createorder').get(authMiddleware,orderController.createOrder);

module.exports={router}