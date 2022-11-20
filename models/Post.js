const mongoose = require('mongoose');

const PostBlog=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    Date:{type:Date,default:Date.now},
    post_image:{type:String,required:true}
    

})

module.exports=mongoose.model('Post',PostBlog)