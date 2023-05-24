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
const nodemailer = require("nodemailer");
let randomstring = require("randomstring");

const uploadimage = async (req, res, next) => {
    try {
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
        
        console.log("req.query", req.query);
        const response = await Post.find({
            userId: { $ne: req.query._id },
        }).sort({date: -1})
        console.log("res.data in posts", response.data);
        for(let i=0;i<response.length;i++){
            const userData = await User.find({ _id: response[i]._doc.userId })
            response[i]._doc['userData'] = userData
        }
        return res.status(200).json(response)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}
const addSkills = async(req,res,next)=>{
    try{        
        const data = await User.findByIdAndUpdate(req.body.body.userId, { skills: req.body.body.skills }, { new: true });
        console.log("hello",data)
        const ret = await data.save()
        return res.status(200).json(ret)
    }
    catch(err){
        return res.status(400).json(err)
    }
}
const postsummary = async(req,res,next) => {
    try{
        const data = await User.findByIdAndUpdate(req.body.userId, {summary: req.body.body}, { new: true });
        const ret = await data.save()
        return res.status(200).json(ret)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}

const getSummary = async(req,res,next) => {
    try{
        const data = await User.find({email:req.query.email});
        console.log("data",data)
        const resSummary = data[0].summary;

        const response = resSummary.substring(0,101)+".......";
        console.log("output",response)

        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}

const post = async (req, res, next) => {
    try {
        const timestamp = Date.now()
        const date = new Date(timestamp);
        // const dateString = date.toLocaleDateString();
        const data = new Post({
            userId: req.body.userId,
            text: req.body.text,
            date: date,
        })
        await data.save()
        return res.status(200).json(req.body)

    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
}
const postlike = async (req, res, next) => {
    const data = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(data)
}

const login = async (req, res) => {
    try {
        console.log("req body", req.body)
        let user = await User.find({ email: req.body.email })
        if(user.length > 0 && user[0].isBlocked == true){
            return res.status(400).json({message: 'Sorry! You are blocked'});
        }
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
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404).json({message: 'user not found'})
    }
}

const getUserById = async(req, res) => {
    try {
        console.log("req query userId", req.query.userId)
        const user = await User.findById(req.query.userId);
        res.status(200).json(user)
      } catch (err) {
        res.status(500).json(err);
      }
}

const getAllUsers = async(req, res) => {
    try{
        const allUsers = await User.find({email: {$nin: [req.query.email]}})
        res.status(200).json(allUsers)
    }catch(err) {
        res.status(500).json(err)
    }
}

const getAllStudents = async(req, res) => {
    try{
        const allUsers = await User.find({email: {$nin: [req.query.email]}, role: {$nin: [req.query.role]}})
        res.status(200).json(allUsers)
    }catch(err) {
        res.status(500).json(err)
    }
}

const blockStudent = async(req, res) => {
    try{
        const data = await User.findByIdAndUpdate(req.query.userId, {isBlocked: true}, { new: true })
        const ret = await data.save()
        return res.status(200).json(ret)
    }catch(err){
        res.status(500).json(err)
    }
}

const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.find({ email: email })
        console.log("inside forgotPassword", userData)
        if (userData) {
            console.log("inside userdata")
            randomstring = await randomstring.generate();
            console.log("randomString", randomstring)
            const name = userData[0].name;
            console.log("name", name)
            const uu = await User.updateOne({ email: email }, { $set: { token: randomstring, pwd: '' } }, { new: true })
            console.log("User", uu)
            await resetPasswordMail(email, name, randomstring);
            console.log("done");
            res.status(200).send({ msg: "done" })

        } else {
            res.status(200).send({ success: true, msg: "This User Email does not exist" })
        }


    } catch (err) {
        res.status(400).send({ success: false, msg: err.message })
    }
}

const reset_password = async (req, res) => {
    try {
        const token = req.query.token;
        const password = req.query.password;
        console.log("password", password)
        console.log("token", token);


        const tokenData = await User.findOne({ token: token })
        // console.log("token data",tokenData)
        if (tokenData) {

            console.log("inside token Data", tokenData)
            const newPassword = await hashPassword(req.query.password);
            console.log("newPassword", newPassword)
            const email = { email: "sahu.ashi0911@gmail.com" }
            const update = { password: newPassword, token: "" }
            const UserData = await User.findOneAndUpdate(email, update)
            // const UserData = User.updateOne({email:"sahu.ashi0911@gmail.com"}, { $set:  })
            console.log("UserData", UserData)
            res.status(200).send({ success: true, msg: "User Password has been reset" })
        } else {
            res.status(200).send({ success: false, msg: "This link has been expired" })
        }


    } catch (error) {
        console.log("error", error.message);
        res.status(400).send({ success: false, msg: error.message })
    }
}

const resetPasswordMail = async (email, name, token) => {
    try {

        console.log("token", token, email, name)
        // window.localStorage.setItem('token', JSON.stringify(token));
        // console.log("token",localStorage.getItem(token))
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "CollegeInsight2023@gmail.com",
                pass: "biyfwxeccgiyqhyw"
            }
        })
        const myFun = () => {
            console.log("dicvyanshi")
        }
        let info = await transporter.sendMail({
            from: "CollegeInsight2023@gmail.com", // sender address
            to: email, // list of receivers
            subject: "Reset Password", // Subject line
            // html: '<p> Hi ' + name + ', Please copy the link and <a href = "http://localhost:3000/login">Reset Password'
            // html: '<p> Hi ' + name + ', Please copy the link and <a onClick="myFun()">Reset Password</a>'
            text: `Hi I am Please click on the link http://localhost:3000/resetpassword/${token}\n\n`
        });
        console.log("Message sent: %s", info.messageId);

    } catch (err) {
        console.log("err", err.message)
    }
}

const getSuggestedPeople = async (req,res)=>{
    try{
        const sugggestedUsers = await User.find({email:{$ne:req.query.email}}).limit(5)
        console.log("users",sugggestedUsers.length);
        return res.status(200).json(sugggestedUsers);
    }catch(error){
        console.log("err", error.message);
        return res.status(400).send({success:false,msg:err.message})
    }
}

const getSelfPosts = async(req, res) => {
    try {
        console.log("req.query", req.query);
        const id = await User.find({email: req.query.email})
        console.log("iddddd", id[0]._id)
        const response = await Post.find({
            userId: id[0]._id,
        }).sort({date: -1})
        console.log("res.data in posts", response);
        return res.status(200).json(response)
    } catch (err) {
        return res.status(400).json(err.message)
    }
}


module.exports = { signup,addSkills, login, getUser, post, getpost, postlike, uploadimage, postsummary, getProfilePicture, getUserById, getAllUsers, getSummary, getAllStudents, blockStudent ,forgotPassword, reset_password, resetPasswordMail,getSuggestedPeople, getSelfPosts}