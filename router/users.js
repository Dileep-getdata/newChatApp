const express=require('express');
const router=express.Router();
const userController=require('../controller/users');

router.post('/signup',userController.postChatSignup);

router.post('/login',userController.postChatLogin);

module.exports=router;