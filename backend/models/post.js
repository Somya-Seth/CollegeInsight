const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const post = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    date: {
        type: String,
    },
	text:{
		type: String,
	},
    img: {
        data: Buffer,
        contentType: String,
        required: false,
    }
})
const Post = mongoose.model('Post', post);

module.exports = Post;