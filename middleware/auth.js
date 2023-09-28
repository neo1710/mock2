const jwt=require('jsonwebtoken');

const auth=async(req,res,next)=>{
let token= req.headers.authorization?.split(" ")[1];
try {
    if(token){
     jwt.verify(token,'neo',(err,decoded)=>{
        if(decoded){
           req.body.userId=decoded._id;
           req.body.email=decoded.email;
           console.log(req.body);
           next(); 
        }else{
            res.status(400).send({msg:"wrong token"});
        }
     })
    }else{
        res.status(400).send({msg:"token is required"});
    }   
} catch (error) {
  res.status(500).send({msg:'auth error'})  
}

}

module.exports=auth;