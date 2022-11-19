const express = require("express");
const app = express();
const path = require("path");
const hostname = "127.0.0.1";
const PORT = 3002;
const expressHbs = require("express-handlebars");
app.engine(
  "handlebars",
  expressHbs.engine({
    defaultLayout: "main",
    extname: "handlebars"
  })
);

app.set("view engine", "handlebars");
app.set("views", "site/views");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("site2/index");
});
app.get("/about", (req, res) => {
    res.render("site2/about");
});
app.get("/blog", (req, res) => {
    res.render("site2/blog");
});
app.get("contact", (req, res) => {
    res.render("site2/contact");
});
app.get("/blog-single", (req, res) => {
    res.render("site2/blog-single");
});
app.get("/login", (req, res) => {
    res.render("site2/login");
});
app.get("/register", (req, res) => {
    res.render("site2/register");
});

app.listen(PORT, hostname, () => {
  console.log(`SERVER IS RUNING  http://${hostname}:${PORT}`);
});

//====================MIDELWARE FUnc
// app.use("/test", (req, res, next) => {
//   res.end("MIDDLEWARE");
//   next();
// });

//===========END MIDLEWAREW FUNC

//TESING

// app.get("/", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "index.html"));
//   });
//   app.get("/users/:userID/movies/:movideID", (req, res) => {
//     res.send(
//       `<h1>USER_NAME---${req.params.userID}</h1>
//          <h2>MOVIDE_ID---${req.params.movideID}</h2>
//          `
//     );
//   });

//===END TESTING DY
