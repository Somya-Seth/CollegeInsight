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
const Post = require('./models/post')
const Conversation = require("./models/Conversation")

//middlewares
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
})

const connection = require('./controllers/db');
const { resourceLimits } = require('worker_threads');

connection();
app.get('/setcookie', (req, res) => {
    res.cookie("divyanshi", "paras", { expires: new Date(new Date().getTime() + 5 * 60 * 1000) });
    res.send('Cookie have been saved successfully');
});
app.get('/cookie', async (req, res) => {
    let cookie = await req.cookies;
    console.log("cookie", cookie)
    res.send(cookie)
})
app.post('/addSkills', async function (req, res) {
    try {
        await router.addSkills(req, res);
    }
    catch (err) {
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
app.post('/post', async function (req, res) {
    try {
        await router.post(req, res)
    } catch (err) {
        console.log("error", err)
    }
})
app.post('/postlike', async function (req, res) {
    try {
        await router.postlike(req, res)
    } catch (err) {
        console.log(err)
    }
})
app.get('/getpost', async function (req, res) {
    try {
        await router.getpost(req, res)
    } catch (err) {
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
    try {
        console.log("req.file 1", req.file);
        await router.uploadimage(req, res)
    }
    catch (err) {
        console.log("error", err);
    }
})

app.post('/postsummary', async function (req, res) {
    try {
        await router.postsummary(req, res)
    }
    catch (err) {
        console.log("error", err);
    }
})
app.get('/getSummary', async function (req, res) {
    try {
        await router.getSummary(req, res)
    } catch (err) {
        console.loh("error", err)
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
        console.log("file", file)
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log("file", file)
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
app.post('/postImage', upload.single("postImage"), async function (req, res) {
    try {
        console.log("mksdkl", req.body);
        console.log("req file", req.file)
        const xyz = path.join(__3dirname, "../" + '/uploads')
        console.log("dirname", xyz);
        req.body.postImage = fs.readFileSync(path.join(__dirname, "../backend" + '/uploads' + "/" + req.file.filename))
        const obj = {
            postImage: {
                data: req.body.postImage,
                contentType: 'image/png'
            }
        }
        req.body.postImage = obj.postImage
        req.body.postImage.contentType = 'image/png'
        const data = await User.findByIdAndUpdate({ _id: req.body.userId }, req.body, {});
        console.log("user data", data);
        await data.save()
    } catch (err) {
        console.log("erroororroror", err.message);
        res.status(502).json({ message: 'Server error' });
    }
})
app.post('/postprofile', upload.single("profilePicture"), async function (req, res) {
    try {
        console.log("mksdkl", req.body);
        console.log("req file", req?.file)
        const xyz = path.join(__dirname, "../" + '/uploads')
        console.log("dirname", xyz);
        if (req.body.profilePicture == 'null') {
            const pf = await User.findById(req.body.userId)
            req.body.profilePicture = pf.profilePicture
        }
        else {
            req.body.profilePicture = fs.readFileSync(path.join(__dirname, "../backend" + '/uploads' + "/" + req?.file?.filename))
            const obj = {
                profilePicture: {
                    data: req.body.profilePicture,
                    contentType: 'image/png'
                }
            }
            req.body.profilePicture = obj.profilePicture
            req.body.profilePicture.contentType = 'image/png'
        }
        const data = await User.findByIdAndUpdate({ _id: req.body.userId }, req.body, {});
        console.log("user data", data);
        await data.save()
    } catch (err) {
        console.log("erroororroror", err.message);
        res.status(502).json({ message: 'Server error' });
    }
})

app.post('/image', upload.single("image"), async function (req, res) {
    console.log("req.body in profile modal", req.body);
    try {
        const xyz = path.join(__dirname, "../" + '/uploads')
        console.log("dirname", xyz);
        if (req.body.image == 'null') {
            const timestamp = Date.now()
            const date = new Date(timestamp);
            const data = new Post({
                userId: req.body.userId,
                text: req.body.text,
                date: date,
            })
            await data.save()
            return res.status(200).json(req.body)
        }
        else {
            req.body.image = fs.readFileSync(path.join(__dirname, "../backend" + '/uploads' + "/" + req?.file?.filename))
            const obj = {
                img: {
                    data: req.body.image,
                    contentType: 'image/png'
                }
            }
            req.body.image = obj.img
            req.body.image.contentType = 'image/png'
        }
        const timestamp = Date.now()
        const date = new Date(timestamp);
        const data = new Post({
            userId: req.body.userId,
            text: req.body.text,
            img: req.body.image,
            date: date,
        })
        await data.save()
        return res.status(200).json(req.body)
    } catch (err) {
        console.log("error while posting image", err.message);
        res.status(502).json(err);
    }
})


app.get('/profilePicture', async function (req, res) {
    try {
        await router.getProfilePicture(req, res);
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ message: 'error while fetching image' })
    }
})

app.get('/postImage', async function (req, res) {
    try {
        await router.getPostImage(req, res);
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ message: 'error while fetching image' })
    }
})



app.get('/user', async function (req, res) {
    try {
        await router.getUserById(req, res);
    } catch (err) {
        res.status(400).send({ message: 'error while getting friend' })
    }
})

app.get('/allUsers', async function (req, res) {
    try {
        await router.getAllUsers(req, res);
    }
    catch (err) {
        res.status(400).send({ message: 'error while getting all users' })
    }
})

app.get('/allStudents', async function (req, res) {
    try {
        await router.getAllStudents(req, res)
    }
    catch (err) {
        res.status(400).send({ message: 'error while fetching all students' })
    }
})

app.get('/blockStudent', async function (req, res) {
    try {
        await router.blockStudent(req, res)
    }
    catch (err) {
        res.status(400).send({ message: 'error while blocking a student' })
    }
})

app.get("/resetpassword", async function (req, res) {
    try {
        await router.reset_password(req, res)
    }
    catch (error) {
        console.log("error", error.message)
        res.status(400).send({ success: false, msg: error.message })
    }
})

app.post("/forgetpassword", async function (req, res) {
    try {
        console.log("inside api", req.body)
        await router.forgotPassword(req, res)
    } catch (err) {
        console.log("password-reset error", err.message)
        res.status(400).send({ success: false, msg: err.message })
    }
})

app.get("/suggestedPeople", async function (req, res) {
    try {
        console.log("api hit")
        await router.getSuggestedPeople(req, res);

    } catch (err) {
        console.log("suggestion error", err.message)
        res.status(400).send({ success: false, msg: err.message })
    }
})

app.get("/getSelfPosts", async function (req, res) {
    try {
        await router.getSelfPosts(req, res)
    }
    catch (err) {
        console.log("error occured in fetching self posts", err)
        res.status(400).send({ success: false, msg: err.message })
    }
})
app.get("/summary", async function (req, res) {
    try {
        console.log("api hit")
        await router.getSummary(req, res);

    } catch (err) {
        console.log("summary error", err.message)

    }
})

app.get("/conversations/find", async (req, res) => {
    console.log("req.body in conversation route", req.query);
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.query.firstUserId, req.query.secondUserId] },
        });
        console.log("conversationsssss", conversation);
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
});

app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);