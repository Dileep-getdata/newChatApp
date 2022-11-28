const bcrypt=require('bcrypt');
const Users=require('../models/Users');
const Chat=require('../models/Chat');
const Groups=require('../models/groups');
const UserGroup=require('../models/Usergroup');
const jwt=require('jsonwebtoken');


exports.crtGroup=async(req,res,next)=>{
    const groupname = req.body.name;
    // console.log(req.user);
    const useId=req.user.id;
    const phoneNo=req.user.phoneNo;
    const group= await Groups.create({        
        name:groupname,
        createdBy:phoneNo,                        
    });
    console.log(group);
    await UserGroup.create({
        groupId:group.id,
        userId:useId,
    });
       
    return res.status(200).json({success:true,message:'Successfully created group'})

}
// 

// 
exports.getListOfGroups=async(req,res,next)=>{
    try{ 
        const listUserGroups= await UserGroup.findAll({where:{userId:req.user.id}});        
        return res.status(200).json({userGrp:listUserGroups,success:true,message:'Successfully Get No Of Groups'});

    }catch(err){
        return res.status(500).json({success:false,message:err});

    }
}

exports.getGroupDetails=async(req,res,next)=>{
    try{ 
        const groupId=req.query.groupId;
        
        const listGroups= await Groups.findByPk(groupId);        
        return res.status(200).json({userGrp:listGroups,success:true,message:'Successfully Get No Of Groups'});

    }catch(err){
        return res.status(500).json({success:false,message:err});

    }
}

exports.addToGroup=async(req,res,next)=>{
    try{
        const {grpId,userNo}=req.body;
        const userId=await Users.findAll({where:{phoneNo:userNo}});
        const grpAdd=await UserGroup.create({userId:userId[0].id,groupId:grpId});
        console.log(grpAdd);
        return res.status(200).json({success:true,message:"Invitaioon send successfully"});

    }catch(err){
        return res.status(500).json({success:false,message:err});

    }
}