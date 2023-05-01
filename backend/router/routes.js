const User = require('../models/user')
const Post = require('../models/post')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const express = require("express")
const app = express()
const axios = require("axios");
var cookieParser = require('cookie-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const fs = require('fs');
// const DIR = path.resolve();
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // cb(null, path.join(__dirname + "../uploads"));
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log("filename", file.originalname);
//         cb(null, file.originalname);
//     }
// });

const uploadimage = async (req, res, next) => {
    try {
    //   const upload = multer({ storage });
    const user = {
        email:"xyz@gmail.com"
    }
        const imageUrl = `http://localhost:8000/${req.file}`;
        const users = await User.findOneAndUpdate({ email: user.email}, {profilePicture: imageUrl });
        return res.status(200).json({ message: 'profile picture updated successfully' });
    //   });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
};

const signup = async (req, res) => {
    try {
        const { name, enrNo, email, password, role } = req.body;
        console.log(req.body)
        if (!(name && enrNo && email && password && role)) {
            console.log(name, enrNo, email, password, role)
            return res.status(400).send({ status: 'error', message: 'Please fill all the fields' })
        }
        const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
        const roleTypes = ['TEACHER', 'STUDENT']
        if (!emailPattern.test(email)) {
            return res.status(400).send({ status: 'error', message: 'invalid email address provided' })
        }
        else if (!passwordPattern.test(password)) {
            return res.status(400).send({ status: 'error', message: 'password criteria doesnot match' })
        }
        else if (!roleTypes.includes(role)) {
            return res.status(400).send({ status: 'error', message: 'Role can be only of TEACHER or STUDENT' })
        }
        else {
            const pwd = await hashPassword(req.body.password)
            console.log("after hashing", pwd);
            req.body.password = pwd;
            const data = new User(req.body)
            const ret = await data.save()
            return res.status(200).json(req.body)
        }
    }
    catch (err) {
        console.log(err.name);
        if (err.name == 'MongoServerError') {
            return res.status(404).send({ message: 'user already exists' })
        }
        else {
            console.log(err)
        }
    }
}

const hashPassword = async (password) => {
    try {
        let hash = bcrypt.hash(password, saltRounds)
        console.log("hahseddd", hash)
        return hash;
    }
    catch (err) {
        console.log(err)
    }

}

const getUser = async (req, res, next) => {
    const users = await User.find({ email: req.query.email });
    return res.json(users);
}
const getpost = async (req, res, next) => {
    try {
        const data = await Post.find()

        for (var i = 0; i < data.length; i++) {
            const userData = await User.find({ _id: data[i]._doc.userId })
            data[i]._doc['userData'] = userData
        }
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)

    }
}
const postsummary = async(req,res,next) => {
    try{
        const data = await User.findByIdAndUpdate(req.body.userId, req.body, { new: true });
        const ret = await data.save()
        
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}
// const postprofile = async(req,res ,next) => {
//     try{
//         // fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
//         var storage = multer.diskStorage({
//             destination: (req, file, cb) => {
//                 console.log("multer code is running", path.join(__dirname, "../" + '/uploads'));
//                 cb(null, path.join(__dirname, "../" + '/uploads'));
//             },
//             filename: (req, file, cb) => {
//                 // const fileName = file.originalname.toLowerCase().split(' ').join('-');
//                 // const fileName = file.fieldname
//                 console.log("filename", file.fieldname + '-' + Date.now());
//                 cb(null, file.fieldname + '-' + Date.now());
//             }
//         });
//         var upload = multer({ storage: storage });
//         upload.single("profilePicture"), 
//         console.log("mksdkl", req.body);
//         const xyz = path.join(__dirname, "../" + '/uploads')
//         console.log("dirname", xyz);
//         // req.body.body.profilePicture = fs.readFileSync(path.join(__dirname, "../" + '/uploads'+"/"+req.body.profilePicture))
//         const data = await User.findByIdAndUpdate(req.body.userId, req.body.body, { new: true });
//         const ret = await data.save()
//     }catch(err){
//         console.log(err)
//         return res.status(400).json(err)
//     }
// }
const post = async (req, res, next) => {
    try {
        const timestamp = Date.now()
        const date = new Date(timestamp);
        const dateString = date.toLocaleDateString();
        const data = new Post({
            userId: req.body.userId,
            text: req.body.text,
            date: dateString,
        })
        await data.save()
        return res.status(200).json(req.body)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}
// const getlike = async (req,res,next) => {

// }
const postlike = async (req, res, next) => {
    const data = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(data)
}
const verify = (req, res, next) => {
    // const authHeader = req.headers.authorization;
    const authToken = req.cookies.access_token;
    if (authToken) {
        // const token = authHeader.split(" ")[1];
        try {
            const data = jwt.verify(authToken, jwtSecret);
            req.userId = data.id;
            return next();
        }
        catch (err) {
            res.status(403).json('Token is not valid')
        }
        // console.log("token", token)
        // jwt.verify(token, "mySecretKey", (err, user) => {
        //     if (err) {
        //         return res.status(403).json("Token is not valid");
        //     }
        //     req.user = user;
        //     next();
        // })
    } else {
        res.status(401).json("You are not authorized");
    }
}

const jwtSecret = 'mySecretKey';

const generateAccessToken = (user) => {
    // return jwt.sign({ id: user[0].id, isAdmin: user[0].isAdmin }, jwtSecret , {
    //     expiresIn: "350s",
    // });
    return jwt.sign({ id: user[0]._id, isAdmin: 'admin' }, jwtSecret, {
        expiresIn: "240s",
    });
};


const login = async (req, res) => {
    try {
        console.log("req body", req.body)
        let user = await User.find({ email: req.body.email })
        console.log("user", user)
        let userExist;
        let passwordMatch = false;
        if (user.length > 0) {
            let result = bcrypt.compareSync(req.body.password, user[0].password)
            console.log("password match result", result)
            if (result == true) {
                passwordMatch = true;
            }
            if (!passwordMatch) {
                return res.status(400).send({ message: 'Invalid Password' })
            }
            // passwordMatch = true
            userExist = (user[0].email === req.body.email && passwordMatch)
        }
        else {
            return res.status(400).json({ message: 'user does not exist!Please Signup' })
        }
        console.log("userExist", userExist)
        if (userExist) {

            // const accessToken = generateAccessToken(user)
            // const refreshToken = generateRefreshToken(user)
            // refreshTokens.push(refreshToken)
            // console.log("accesstoken", accessToken)
            // await  axios.get("http://localhost:8000/setcookie", {withCredentials: true})
            return res.status(200).json({ message: 'logged in succesfully.. continue with your work' });
        } else {
            res.status(400).send({
                status: 403,
                msg: "Email or Password Incorrect",
            });
        }
    }
    catch (err) {
        console.log(err)
    }
}

const getProfilePicture = async(req, res) => {
    const user = await User.find({email: req.query.email})
    console.log(user);
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404).json({message: 'user not found'})
    }
}

// const logout = async(req, res) => {
//     const verify = verify()
//     return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// }
module.exports = { signup, login, getUser, post, getpost, postlike, uploadimage, postsummary, getProfilePicture }