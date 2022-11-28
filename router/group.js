const express=require('express');
const router=express.Router();
const groupController=require('../controller/group');
const authMiddleware=require('../middleware/auth');


router.post('/creategroup',authMiddleware.authentication ,groupController.crtGroup);

router.get('/nubOfGroups',authMiddleware.authentication,groupController.getListOfGroups);

router.get('/groupDetails',authMiddleware.authentication,groupController.getGroupDetails);

router.post('/addToGroup',authMiddleware.authentication,groupController.addToGroup);

module.exports=router;