
const express=require('express')
const router =express.Router()
const Post =require("../models/Post")
const path=require('path')
const Category=require("../models/Category")


  router.get("/new", (req, res) => {
    if(!req.session.userId){
   res.redirect("/users/login")
    }
    Category.find({}).then((categories)=>{

      res.render("site2/addpost",{categories:categories})

    })
    
    
  });
  router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then(post=>{
      res.render('site2/post',{post:post})
    })
    console.log(req.params);
    
  });
  router.post("/test", (req, res) => {
    let post_image=req.files.post_image;
    post_image.mv(path.resolve(__dirname,'../public/img/postimages',post_image.name))
   Post.create({
    ...req.body,
    post_image:`/img/postimages/${post_image.name}`,
    author:req.session.userId

   },)
   req.session.sessionFlash={
    type:'alert alert-success',
    message:'Post added is Success'

   }
   
   
    
   res.redirect('/blog')
  });
  module.exports=router