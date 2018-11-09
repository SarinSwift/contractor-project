// comment.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
});

module.exports = Comment
