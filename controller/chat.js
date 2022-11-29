const Users=require('../models/Users');
const Chat=require('../models/Chat');
const {Op}=require('sequelize');
const s3services=require('../services/s3upload');
const fs=require('fs');


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
    // try{
        const chatMessage=req.body.chat;
        // console.log('Chat:--',chatMessage);
        // req.user.update({login:true});
        console.log(req.user.id);
        if(req.body.imagepath){
            const imagePath = req.body.imagePath
            const blob = fs.readFileSync(imagePath)
            const filename=`${new Date()}.${imagePath.split('.')[1]}`;
            console.log(blob,filename);
            const fileURL=await s3Services.upLoadToS3(blob,filename);
            return res.status(200).json({url:fileURL});
        }
        Chat.create({
            message:chatMessage,
            image:req.body.imagepath,
            userId:req.user.id,
        })
    //     
       return res.status(200).json();
    // }catch(err){
    //     res.status(500).json({success:false,message:err});
    // }
}
// 

