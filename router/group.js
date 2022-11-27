const express=require('express');
const router=express.Router();
const groupController=require('../controller/group');
const authMiddleware=require('../middleware/auth');


router.post('/creategroup',authMiddleware.authentication ,groupController.createGroup);

module.exports=router;