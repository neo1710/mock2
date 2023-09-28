const mongoose = require('mongoose');

const blogSchema=mongoose.Schema({
    userId:{type:String,required:true},
 email:{type:String,required:true},
 date:{type:String,required:true},
 content:{type:String,required:true},
 title:{type:String,required:true},
 category:{type:String,required:true},
 likes:{type:Number,required:true},
 comments:{type:[{userId:String,content:String}],required:true}
})

const BlogModel=mongoose.model('blogs',blogSchema);

module.exports=BlogModel;