const{Router}=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const BlogModel = require('../models/blogModel');
const auth = require('../middleware/auth');

let blogRouter=Router();

blogRouter.get('/blogs',auth,async(req,res)=>{
try {
    let data= await BlogModel.find();
   res.status(200).send({data}); 
} catch (error) {
    console.log(error);
    res.status(400).send({msg:"Outer error"});
}

})

blogRouter.post('/blogs',auth,async(req,res)=>{
    try {
        let blog=new BlogModel({...req.body,date:Date(),likes:0,comments:[]});
        await blog.save();
       res.status(200).send({msg:'blog added',blog}); 
    } catch (error) {
        console.log(error);
        res.status(400).send({msg:"Outer error"});
    }
    
    })

    blogRouter.patch('/blogs/:id',auth,async(req,res)=>{
       let {id}=req.params;
        try {
            let post=await BlogModel.findOne({_id:id});
            if(post.userId==req.body.userId){
            let blog= await BlogModel.findByIdAndUpdate(id,req.body);
             res.status(200).send({msg:'blog updated',blog}); 
            }else{
                res.status(400).send({msg:"not your post"});
            }
          
        } catch (error) {
            console.log(error);
            res.status(400).send({msg:"Outer error"});
        }
        
        })


        blogRouter.delete('/blogs/:id',auth,async(req,res)=>{
            let {id}=req.params;
             try {
                 let post=await BlogModel.findOne({_id:id});
                 if(post.userId==req.body.userId){
                 let blog= await BlogModel.findByIdAndDelete(id,req.body);
                  res.status(200).send({msg:'blog Deleted',blog}); 
                 }else{
                     res.status(400).send({msg:"not your post"});
                 }
               
             } catch (error) {
                 console.log(error);
                 res.status(400).send({msg:"Outer error"});
             }
             
             })

             blogRouter.patch('/blogs/:id/like',auth,async(req,res)=>{
                let {id}=req.params;
                 try {
                     let post=await BlogModel.findOne({_id:id});
                        let likes=post.likes+1;
                     let blog= await BlogModel.findByIdAndUpdate(id,{likes});
                      res.status(200).send({msg:'liked',blog}); 
                 } catch (error) {
                     console.log(error);
                     res.status(400).send({msg:"Outer error"});
                 }
                 
                 })

                 blogRouter.patch('/blogs/:id/comment',auth,async(req,res)=>{
                    let {id}=req.params;
                     try {
                         let post=await BlogModel.findOne({_id:id});
                         let comment={userId:req.body.userId,content:req.body.content};
                         post.comments.push(comment);
                         let blog= await BlogModel.findByIdAndUpdate(id,post);
                          res.status(200).send({msg:'commented',blog}); 
                     } catch (error) {
                         console.log(error);
                         res.status(400).send({msg:"Outer error"});
                     }
                     
                     })




module.exports=blogRouter;