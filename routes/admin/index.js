const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../../models/Category");
const Post = require("../../models/Post");
router.get("/", (req, res) => {
  res.render("admin/index");
});
router.get("/categories", (req, res) => {
  Category.find({})
    .sort({ $natural: -1 })
    .then((categories) => {
      res.render("admin/categories", { categories: categories });
    });
});
router.post("/categories", (req, res) => {
  Category.create(req.body, (error, category) => {
    if (!error) {
      res.redirect("categories");
    }
  });
});
router.delete("/categories/:id", (req, res) => {
  Category.remove({ _id: req.params.id }).then(() => {
    res.redirect("/admin/categories");
  });
});
router.put("/categories/:id", (req, res) => {
  Category.findByIdAndUpdate({ _id: req.params.id }).then(() => {
    res.redirect("/admin.categories");
  });
});

router.get("/post", (req, res) => {
  Post.find({})
    .populate({ path: "category", model: Category })
    .sort({ $natural: -1 })
    .then((posts) => {
      res.render("admin/post", { posts: posts });
    });
});

router.delete("/post/:id", (req, res) => {
  Post.remove({ _id: req.params.id }).then(() => {
    res.redirect("/admin/post");
  });
});

router.get("/post/edit/:id", (req, res) => {
  Post.findOne({ _id: req.params.id }).then((post) => {
    Category.find({}).then((categories) => {
      res.render("admin/editpost", { post: post, categories: categories });
    });
  });
});


router.put('/post/:id',(req,res)=>{
  let post_image=req.files.post_image;
  post_image.mv(path.resolve(__dirname,'../../public/img/postimages',post_image.name))

  Post.findOne({_id:req.params.id}).then(post=>{
    post.title=req.body.title
    post.content=req.body.content
    post.Date=req.body.Date
    post.category=req.body.category
    post.post_image=`/img/postimages/${post_image.name}`
    post.save().then(post=>{
      res.redirect('/admin/post/')
    })

  })

})
module.exports = router;
