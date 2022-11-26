const Users=require('../models/Users');
const Chat=require('../models/Chat');

exports.chatDetails= async(req,res)=>{
    try{
        var lastId=req.query.lastId;
        console.log('lastId:-',lastId===undefined);
        req.user.update({login:true});
        const users= await Users.findAll({where:{login:true},attributes:['userName']});
        if(lastId!==undefined){
            const chatMsg=await Chat.findAll({where:{id:{[Op.gt]: lastId}}});
        }
        
       return res.status(200).json({users:users,chat:chatMsg});
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
