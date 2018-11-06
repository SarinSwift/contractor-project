const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project');

var exphbs = require('express-handlebars');

// let posts = [
//     { title: "Homemade organic cookies", foodTitle: "Good for all ages!" },
//     { title: "Organic acai powder", foodTitle: "Easily blend formula" }
// ]

const Post = mongoose.model('Post', {
    title: String,
    foodTitle: String
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.render('posts-index', { posts: posts });
        })
        .catch(err => {
            console.log(err);
        })
})




app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
