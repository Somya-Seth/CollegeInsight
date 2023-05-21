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
        // const data = await Post.find()
        // for (var i = 0; i < data.length; i++) {
        //     const userData = await User.find({ _id: data[i]._doc.userId })
        //     data[i]._doc['userData'] = userData
        // }
        // return res.status(200).json(data)
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
        const data = await User.findById(req.body.userId);
        const ret = await data.save()
        return res.status(200).json(ret)
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

module.exports = { signup,addSkills, login, getUser, post, getpost, postlike, uploadimage, postsummary, getProfilePicture, getUserById, getAllUsers, getSummary }