const mongoose = require('mongoose');

const Post = mongoose.model('Post', {
    title: String,
    foodTitle: String,
    description: String,
    number: String,
    contactInfo: String
});

module.exports = Post;
