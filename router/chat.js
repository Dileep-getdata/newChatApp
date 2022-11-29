const express=require('express');
const router=express.Router();
const userController=require('../controller/chat');
const authMiddleware=require('../middleware/auth')



router.get('/chat',authMiddleware.authentication ,userController.chatDetails);

router.post('/chat',authMiddleware.authentication ,userController.chatPost);

router.get('/image',authMiddleware.authentication,userController.imageSave);

module.exports=router;