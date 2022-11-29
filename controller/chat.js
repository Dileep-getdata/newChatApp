const Users=require('../models/Users');
const Chat=require('../models/Chat');
const {Op}=require('sequelize');
const s3services=require('../services/s3upload');

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
// 

exports.imageSave = async (req,res)=>{
    try{      
        const image_pth=await Chat.findAll();  
    const userId=req.user.id;
    const imagePath = req.files[0].path
    const blob = fs.readFileSync(imagePath)
    const filename=image_pth;
    const fileURL=await s3Services.upLoadToS3(blob,filename);
    // res.status(200).json({fileURL,success:true});
    }catch(err){
        res.status(500).json({fileURL:'',success:false,err:err});
    }
    
}