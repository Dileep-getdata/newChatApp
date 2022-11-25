const Users=require('../models/Users');

exports.chatDetails= async(req,res)=>{
    try{
        
        req.user.update({login:true});
        const users= await Users.findAll({where:{login:true},attributes:['userName']});
       return res.status(200).json({users:users});
    }catch(err){
        res.status(500).json({success:false,message:err});
    }
}
