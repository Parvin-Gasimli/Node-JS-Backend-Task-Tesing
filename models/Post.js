const mongoose = require('mongoose');
const PostBlog=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:mongoose.Schema.ObjectId,ref:"users"},
    content:{type:String,required:true},
    Date:{type:Date,default:Date.now},
    post_image:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'categories'}
})
module.exports=mongoose.model('Post',PostBlog)