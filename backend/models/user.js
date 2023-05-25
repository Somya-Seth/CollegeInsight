const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    enrNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['TEACHER', 'STUDENT']
    },
    course: {
        type: String,
        required: false,
        default: ''
    },
    branch: {
        type: String,
        required: false,
        default: ''
    },
    year: {
        type: String,
        required: false,
        default: ''
    },
    linkedin:{
        type: String,
        required: false,
        default: ''
    },
    github:{
        type: String,
        required: false,
        default: ''
    },
    phone:{
        type: String,
        required: false,
        default: ''
    },
    languages:{
        type: String,
        required: false,
        default: ''
    },
    preferredGenderPronounce: {
        type: String,
        required: false,
        default: ''
    },
    summary: {
        type:String,
        required: false,
        default: ''
    },
    profilePicture: {
        data: Buffer,
        contentType: String,
        required: false,
    },
    skills: {
        type: Array,
        required: false,
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
})
const User = mongoose.model('User', user);

module.exports = User;