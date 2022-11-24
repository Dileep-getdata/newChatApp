const bcrypt=require('bcrypt');
const Users=require('../models/Users');


function isString(string){
    if(string==undefined || string.length===0){
        return true;
    }else{
        return false;
    }
}

// <<<<<<<<<  Posting the SIGN-UP details in Database  >>>>>>>>>>
// 
exports.postChatSignup= async(req,res)=>{
    try{
        const {name,email,phoneNo,password}=req.body;  
        console.log(req.body);  
        if(isString(name) || isString(email) ||isString(phoneNo) || isString(password)){        
            return  res.status(400).json({err:'Bad Input data'});
        }
        const saltrounds=10;
        bcrypt.hash(password,saltrounds, async(err,hash)=>{   
            const userEmail=await Users.findAll({where:{email}});
            const userPhone=await Users.findAll({where:{phoneNo}});
            console.log('checkmail',userEmail);             
            if(userEmail.length>0 && email===userEmail[0].email ){                
                return res.status(404).json({success:false,message:'Exiting Email Id'}); 
            } 
            else if(userPhone.length>0 && phoneNo===userPhone[0].phoneNo){
                return res.status(404).json({success:false,message:'Existing Phone No'});
            }
                await Users.create({
                    userName:name,
                    email:email,
                    phoneNo:phoneNo,
                    password:hash});
                res.status(200).json({success:true,message:'Successfully signed Up'});        
        
        })    
    }
    catch(err){
        res.status(500).json({message:err,success:false});
    }
}