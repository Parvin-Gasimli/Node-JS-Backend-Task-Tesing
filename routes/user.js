const express = require("express");
const router = express.Router();
const RegisterUSer = require("../models/User");

router.get("/register", (req, res) => {
  res.render("site2/register");
});
router.post("/register", (req, res) => {
  RegisterUSer.create(req.body, (err, user) => {
    req.session.sessionFlash = {
      type: "alert alert-success",
      message: "User Registered is Success"
    };
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res) => {
  res.render("site2/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  RegisterUSer.findOne({ email }, (err, user) => {
    if (user) {
      if (user.password === password) {
        req.session.userId = user._id;
        res.redirect("/");
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/register");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
