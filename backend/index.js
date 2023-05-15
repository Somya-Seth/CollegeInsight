require('dotenv').config({ path: "./env" })
const cors = require("cors");
const express = require("express")
const app = express()
// const login = require('./router/routes')
const path = require('path');
const router = require('./router/routes')
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");
app.use(express.json())
var cookieParser = require('cookie-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const uuid = require('uuid');
const DIR = './public/';
const conversationRoute = require("./router/conversations");
const messageRoute = require("./router/messages");
const Router = require('express').Router();
const fs = require('fs');
const User = require('./models/user')

//middlewares
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
// const { UserModule } = require("../models/user")

app.use(cors(corsOptions))

// app.use('/uploads',express.static('uploads'))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})

const connection = require('./controllers/db');
const { resourceLimits } = require('worker_threads');

connection();
app.get('/setcookie', (req, res) => {
    // res.cookie("divyanshi", "paras", { expires: new Date(new Date().getTime() + 5 * 60 * 1000),path:"/",httpOnly:true,secure:false,domain:"localhost"});
    res.cookie("divyanshi", "paras", { expires: new Date(new Date().getTime() + 5 * 60 * 1000) });
    res.send('Cookie have been saved successfully');
});
app.get('/cookie', async (req, res) => {
    let cookie = await req.cookies;
    console.log("cookie", cookie)
    res.send(cookie)
})
app.post('/addSkills', async function(req,res){
    try{
        await router.addSkills(req,res);
    }
    catch(err){
        console.log("error", err)
    }
})
app.post('/signup', async function (req, res) {
    try {
        console.log("hit api")
        await router.signup(req, res);
    }
    catch (err) {
        console.log("error", err)
    }
})
app.post('/post', async function (req,res){
    try{
        await router.post(req,res)
    }catch (err) {
        console.log("error", err)
    }
})
app.post('/postlike', async function(req,res){
    try{
        await router.postlike(req,res)
    }catch(err){
        console.log(err)
    }
})
app.get('/getpost', async function (req,res){
    try{
        await router.getpost(req,res)
    }catch (err) {
        console.log("error", err)
    }
})


app.post('/login', async function (req, res) {
    try {
        await router.login(req, res)
    }
    catch (err) {
        console.log("error", err)
    }
}) 

app.post('/upload', async function (req, res) {
    try{
       console.log("req.file 1", req.file);
       await router.uploadimage(req, res)
    }
    catch(err){
        console.log("error", err);
    }
})

const uploadimage = async (req, res, next) => {
    // try {
    //   const upload = multer({ storage });
    //   upload.single("image")(async (req, res, err) => {
    //     if (err) {
    //       return res.status(400).json({ message: "Error uploading file" });
    //     }
    //     const imageUrl = `http://localhost:8000/${req.file.path}`;
    //     return res.json({ imageUrl });
    //   });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).send("Server error");
    // }
  };
// app.post('/add', upload.single('image'), async function (req, res) {
//     try{
//         await router.uploadimage(req, res)
//     }
//     catch(err){
//         console.log("error", err);
//     }
// })
app.post('/postsummary', async function(req,res){
    try {
        await router.postsummary(req,res)
    }
    catch(err){
        console.log("error", err);
    }
})
app.get('/users', async function (req, res) {
    try {
    
      await router.getUser(req, res)

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("file",file)
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log("file",file)
        cb(null, file.originalname);
    }
  });
var upload = multer({ storage: storage });
app.post('/postImage', upload.single("postImage"), async function(req,res){
    try{
        console.log("mksdkl", req.body);
        console.log("req file",req.file)
        const xyz = path.join(__3dirname, "../" + '/uploads')
        console.log("dirname", xyz);
        req.body.postImage = fs.readFileSync(path.join(__dirname, "../backend" + '/uploads'+"/"+req.file.filename))
        const obj = {
            postImage: {
                data: req.body.postImage,
                contentType: 'image/png'
            }
        }
        req.body.postImage = obj.postImage
        req.body.postImage.contentType = 'image/png'
        const data = await User.findByIdAndUpdate({_id:req.body.userId}, req.body, { });
        console.log("user data", data);
        await data.save()
    }catch (err){
        console.log("erroororroror", err.message);
        res.status(502).json({ message: 'Server error' });
    }
})
app.post('/postprofile', upload.single("profilePicture"), async function(req,res){
    try{
        console.log("mksdkl", req.body);
        console.log("req file",req.file)
        const xyz = path.join(__dirname, "../" + '/uploads')
        console.log("dirname", xyz);
        req.body.profilePicture = fs.readFileSync(path.join(__dirname, "../backend" + '/uploads'+"/"+req.file.filename))
        const obj = {
            profilePicture: {
                data: req.body.profilePicture,
                contentType: 'image/png'
            }
        }
        req.body.profilePicture = obj.profilePicture
        req.body.profilePicture.contentType = 'image/png'
        const data = await User.findByIdAndUpdate({_id:req.body.userId}, req.body, { });
        console.log("user data", data);
        await data.save()
    }catch (err){
        console.log("erroororroror", err.message);
        res.status(502).json({ message: 'Server error' });
    }
})

app.get('/profilePicture', async function(req, res) {
    try{
        await router.getProfilePicture(req, res);
    }catch(err) {
        console.log(err.message);
        res.status(400).send({message: 'error while fetching image'})
    }
})
app.get('/profilePicture', async function(req, res) {
    try{
        await router.getProfilePicture(req, res);
    }catch(err) {
        console.log(err.message);
        res.status(400).send({message: 'error while fetching image'})
    }
})
app.get('/postImage', async function(req, res) {
    try{
        await router.getPostImage(req, res);
    }catch(err) {
        console.log(err.message);
        res.status(400).send({message: 'error while fetching image'})
    }
})

app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

app.get('/user', async function(req, res) {
    try {
        await router.getUserById(req, res);
    }catch(err) {
        res.status(400).send({message: 'error while getting friend'})
    }
})

app.get('/allUsers', async function(req, res) {
    try{
        await router.getAllUsers(req, res);
    }
    catch(err) {
        res.status(400).send({message: 'error while getting all users'})
    }
})
