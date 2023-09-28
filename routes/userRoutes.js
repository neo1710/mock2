const{Router}=require('express');
const UserModel = require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

let userRouter=Router();


userRouter.post('/register',async(req,res)=>{
let {email,password,avatar,username}=req.body;  
    try {
    let check=await UserModel.findOne({email});

    if(check){
        res.status(400).send({msg:"User already exist"});
    }else{
        bcrypt.hash(password,5,async(err,hashed)=>{
            if(hashed){
                let user= new UserModel({email,password:hashed,avatar,username});
                await user.save();
                res.status(200).send({msg:"User has been registered"});
            }else{
                res.status(400).send({msg:"Wrong Credentials"});
            }
        })
    }
    } catch (error) {
        res.status(400).send({msg:"Outer error"});
    }
})

userRouter.post('/login',async(req,res)=>{
    let {email,password}=req.body;  
        try {
        let check=await UserModel.findOne({email});
        if(check){
            bcrypt.compare(password,check.password,async(err,same)=>{
                if(same){
                   let token=jwt.sign({_id:check._id,email:check.email},"neo")
                
                    res.status(200).send({msg:"User has been logged in",token});
                }else{
                    res.status(400).send({msg:"Wrong password"});
                }
            })
        }else{
            res.status(400).send({msg:"User does not exist"}); 
        }
        } catch (error) {
            res.status(400).send({msg:"Outer error"});
        }
    })
    


module.exports=userRouter;