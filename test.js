const mongoose = require("mongoose");
const Post = require("./models/Post");

mongoose.connect("mongodb://localhost:27017/Post_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Post.findByIdAndUpdate(
//   "6379292e1c3191a7e06edab2",
//   {
//     title: "DATA IS UPDATED"
//   },
//   (err, post) => {
//     console.log(err, post);
//   }
// );

// Post.findByIdAndDelete("6379292e1c3191a7e06edab2", (err, post) => {
//   console.log(err, post);
// });

// Post.find({}, (err, post) => {
//   console.log(err, post);
// });

// Post.findById('6379292e1c3191a7e06edab2',(err,post)=>{
//   console.log(err,post);

// })

// Post.create(
//   {
//     title: "SECIND node js Testing ",
//     content: "Node js Server is runing"
//   },
//   (err,post) => {
//     console.log(err, post);
//   }
// );
