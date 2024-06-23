const express=require('express');
const router=express.Router();
const {createUser, userSignIn}=require('../controllers/users');
router.route('/createuser').post(createUser);
router.route('/signin').get(userSignIn);

module.exports={router}