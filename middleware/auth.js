const jwt=require('jsonwebtoken');
const User=require('../models/Users');

exports.authentication=(req,res,next)=>{
    try{
        const token=req.headers.authentication;
        const user=(jwt.verify(token,process.env.TOKEN_SECREATKEY));

        User.findByPk(user.id).then(user=>{
            
            req.user=user;
            // req.user.update({login:true});
            next();
        })


    }catch(err){
        res.status(500).json({success:false,message:'Something went wrong',error:err});
    }
}