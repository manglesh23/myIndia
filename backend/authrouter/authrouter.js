const express=require('express');
const router=express.Router();

const userController=require('../controllers/users');

const productController=require('../controllers/product');

const orderController=require('../controllers/order');

const authMiddleware = require('../middleware/middleware');

router.route('/createuser').post(userController.createUser);

router.route('/signin').get(userController.userSignIn);

router.route('/createproduct').post(productController.createproduct);

router.route('/getproducts').get(authMiddleware,productController.getProducts);

router.route('/getorder').get(orderController.getOrders);

router.route('/createorder').get(authMiddleware,orderController.createOrder);

module.exports={router}