const express = require("express");
const router = express.Router();
const path = require("path");
const Category = require("../../models/Category");
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
module.exports = router  ;