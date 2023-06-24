const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const Post = require("./models/Post");
const fs = require("fs");
const port=process.env.PORT;

mongoose
  .connect("mongodb+srv://yashgrwl14:TtbjKzmSx1KsqcDk@cluster0.yjsgntn.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => console.log("database connected"));
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'))

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = new User({
    username,
    password,
  });
  const result = await userDoc.save();
  res.json(result);
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (userDoc.password == password) {
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else res.json("wrong credentials");
  } catch (e) {
    console.log(e);
  }
});
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/createpost", upload.single("file"), async (req, res) => {
  
  const { originalname, path } = req.file;
 
  const parts = originalname.split(".");
  const name = path.replace(/\\/g, "/") + "." + parts[parts.length - 1];
  fs.renameSync(path, name);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
     
    const {username,id}=info
    const { title, summary, text } = req.body;
    const p1 = new Post({
      title,
      summary,
      text,
      cover: name,
      author:{
        id,username
      }
    });

    const result = await p1.save();
    res.json(result);

    
  });
});

app.get("/postdata", async (req, res) => {
  const data = await Post.find().sort({ createdAt: -1 }) ;
  res.json(data);
});

app.get("/post/:id",async(req,res)=>{
  const _id=req.params.id;
  const data=await Post.findById({_id})
  
  res.json(data)

})
app.put('/editpost/:id',upload.single("file"),async(req,res)=>{
 
  const _id=req.params.id;
  var newpath=null;
  if(req.file)
  {
  const { originalname, path } = req.file;
  
 
  const parts = originalname.split(".");
   newpath = path.replace(/\\/g, "/") + "." + parts[parts.length - 1];
  fs.renameSync(path, newpath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
     
    const {username,id}=info
    const { title, summary, text } = req.body;
   
    const data=await Post.findById({_id})
    const result=await Post.findByIdAndUpdate({_id},{
      title,
      summary,
      text,
      cover: newpath?newpath:data.cover,
      author:{
        id,username
      }
    });
         
    res.json(result);

  });
});
app.listen(port, () => {
  console.log("server running");
});
