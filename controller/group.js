const bcrypt=require('bcrypt');
const Users=require('../models/Users');
const Chat=require('../models/Chat');
const Groups=require('../models/groups');
const jwt=require('jsonwebtoken');
const { chownSync } = require('fs');

exports.createGroup=async(req,res,next)=>{
    const {groupname}=req.body;
    console.log(groupname);
    console.log(req.user);
    res.status(200).json({success:true,message:'Successfully created group'})

}
