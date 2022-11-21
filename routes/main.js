const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Category=require("../models/Category")
const User=require('../models/User')
router.get("/", (req, res) => {
  res.render("site2/index");
  console.log(req.session);
});
router.get("/about", (req, res) => {
  res.render("site2/about");
});
// router.get("/admin", (req, res) => {
//   res.render("admin/index");
// });
router.get("/blog", (req, res) => {
  Post.find({}).populate({path:'author',model:User}).sort({$natural:-1}).then((posts) => {
    Category.find({}).then((categories)=>{
        res.render("site2/blog",{posts:posts,categories:categories})

    })

    
  });
});
router.get("/contact", (req, res) => {
  res.render("site2/contact");
});
router.get("/blog-single", (req, res) => {
  res.render("site2/blog-single");
});

module.exports = router;
