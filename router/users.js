const express=require('express');
const router=express.Router();
const userController=require('../controller/users');
const authMiddleware=require('../middleware/auth'); 


router.post('/signup',userController.postChatSignup);

router.post('/login',userController.postChatLogin);

router.get('/userList',authMiddleware.authentication, userController.getUsers)

module.exports=router;