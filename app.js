const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery',false);
mongoose.connect("mongodb+srv://AyushSachan:Ayush%40703a@cluster0.jczjymr.mongodb.net/BlogDB")

const blogsSchema = {
title: String,
content: String
};

const Blog = mongoose.model("Blog",blogsSchema);

app.get("/",function(req,res){

  Blog.find({},function(err,foundBlogs){
    res.render("home",{
      posts:foundBlogs
    });
  });
 
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){

       const gettitle = req.body.postTitle;
       const getcontent = req.body.postBody;

    const blog = new Blog({
        title : gettitle,
        content : getcontent
    });

    blog.save();
    res.redirect("/");
    
});

app.get("/posts/:postId",function(req,res){

  const requestedPostId = req.params.postId;

Blog.findOne({title : requestedPostId},function(err,found){
  if(!err){
    if(found){
      res.render("post",{
         title:found.title ,
         content : found.content
        });
      }
      else{
        res.redirect("/");
      }
    }
    });
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started");
});
