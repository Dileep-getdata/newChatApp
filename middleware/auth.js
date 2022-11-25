const jwt=require('jsonwebtoken');
const User=require('../models/Users');

exports.authentication=(req,res,next)=>{
    try{
        // console.log(req.headers.authentication);
        const token=req.headers.authentication;
        const user=(jwt.verify(token,process.env.TOKEN_SECREATKEY));
        console.log('Auth:-',user);
        User.findByPk(user.id).then(user=>{            
            req.user=user;            
            next();
        })


    }catch(err){
        res.status(500).json({success:false,message:'Something went wrong in Auth',error:err});
    }
}