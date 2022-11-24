const express=require('express');
const router=express.Router();
const userController=require('../controller/users');

router.post('/signup',userController.postChatSignup);

module.exports=router;