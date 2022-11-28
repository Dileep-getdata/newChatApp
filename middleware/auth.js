const jwt=require('jsonwebtoken');
const User=require('../models/Users');

exports.authentication=async(req,res,next)=>{
    try{
        
        const token=req.headers.authentication;
        const user=(jwt.verify(token,process.env.TOKEN_SECREATKEY));
        
        const userDetails=await User.findByPk(user.id);            
            req.user=userDetails; 
                      
            next();
        

    }catch(err){
        res.status(500).json({success:false,message:'Something went wrong in Auth',error:err});
    }
}