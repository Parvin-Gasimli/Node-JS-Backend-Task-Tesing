
const express=require('express')
const router =express.Router()
const Post =require('../models/Post')
router.get("/", (req, res) => {
    res.render("site2/index");
    console.log(req.session);
    
  });
  router.get("/about", (req, res) => {
      res.render("site2/about");
  });
  router.get("/admin", (req, res) => {
      res.render("site2/admin");
  });
  router.get("/blog", (req, res) => {
    Post.find({}).then(posts=>{
        res.render('site2/blog',{posts:posts});
       
        
    })
    
    
  });
  router.get("/contact", (req, res) => {
      res.render("site2/contact");
  });
  router.get("/blog-single", (req, res) => {
      res.render("site2/blog-single");
  });


  module.exports=router