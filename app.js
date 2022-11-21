const express = require("express");
const mongoose = require("mongoose");
const generateDate=require('./helpers/generateDate').generateDate

const  _handlebars = require('handlebars'),
    expressHandlebars = require('express-handlebars'),
    {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express();
const hostname = "127.0.0.1";
const PORT = 3002;
const expressHbs = require("express-handlebars");
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const Session=require('express-session')
const connectionMongo=require('connect-mongo')
const methodOverride=require("method-override")

// const MyMiddleware=(req,res,next)=>{
//   console.log('NODE JS MIDLEWARE');
//   next()
// }
// app.use('/',MyMiddleware)
app.engine(
  "handlebars",
  expressHbs.engine({
    defaultLayout: "main",
    extname: "handlebars",
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers:{generateDate:generateDate}
  })
);
mongoose.connect("mongodb://localhost:27017/Post_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex:true
});
//Session Expressin
// const MongoStore=connectionMongo(Session)
// const MongoStore=require('connect-mongodb-session')

app.use(Session({
  secret:'foo',
  resave:false,
  saveUninitialized:true,
  //  store: new MongoStore({mongooseConnection:mongoose.connection})
  store: connectionMongo.create({ mongoUrl: 'mongodb://localhost:27017/sessions' })

}))

app.use((req,res,next)=>{
  res.locals.sessionFlash=req.session.sessionFlash
  delete req.session.secret
  next()

})

//METHOD OVERRIDE

app.use(methodOverride('_method'))
//Display Link MIDLEWARE

app.use((req,res,next)=>{
  const {userId}=req.session
  if(userId){
    res.locals={
      displayLink:true
    }
  }
  else{
    res.locals={
      displayLink:false
    }
  }
  next()
})


app.use(fileUpload())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.set("view engine", "handlebars");
app.set("views", "site/views");
app.use(express.static("public"));

const main = require("./routes/main");
const posts = require("./routes/posts");
const user=require('./routes/user')
const admin=require("./routes/admin/index")
app.use("/", main);
app.use("/posts", posts);
app.use('/users',user)
app.use("/admin",admin)

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
