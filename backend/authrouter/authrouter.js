const express=require('express');
const router=express.Router();
const {createUser, userSignIn}=require('../controllers/users');
const { createproduct, getProducts } = require('../controllers/product');
const authMiddleware = require('../middleware/middleware');
const { getOrders } = require('../controllers/order');
router.route('/createuser').post(createUser);
router.route('/signin').get(userSignIn);
router.route('/createproduct').post(createproduct);
router.route('/getproducts').get(authMiddleware,getProducts);
router.route('/order').get(getOrders);

module.exports={router}