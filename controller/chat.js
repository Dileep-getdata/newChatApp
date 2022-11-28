const Users=require('../models/Users');
const Chat=require('../models/Chat');
const {Op}=require('sequelize');

exports.chatDetails= async(req,res)=>{
    try{
        let lastIdQ=req.query.lastId;
        let grpId=req.query.groupId;
        console.log('ID:',grpId);
        if(lastIdQ==='undefined' || lastIdQ==='null'){
            lastIdQ=-1;
        }        
        req.user.update({login:true});
        
        
        const chatMsg=await Chat.findAll({where:{userId:req.user.id,groupId:grpId,id:{[Op.gt]: lastIdQ}}});
        
       return res.status(200).json({chat:chatMsg});
    }catch(err){
        res.status(500).json({success:false,message:err});
    }
}

exports.chatPost= async(req,res)=>{
    try{
        const chatMessage=req.body.chat;
        console.log('Chat:--',chatMessage);
        // req.user.update({login:true});
        console.log(req.user.id);
        Chat.create({
            message:chatMessage,
            userId:req.user.id,
        })
    //     
       return res.status(200).json();
    }catch(err){
        res.status(500).json({success:false,message:err});
    }
}
