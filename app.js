const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

// let posts = [
//     { title: "Homemade organic cookies", foodTitle: "Good for all ages!" },
//     { title: "Organic acai powder", foodTitle: "Easily blend formula" }
// ]

const Post = mongoose.model('Post', {
    title: String,
    foodTitle: String,
    description: String,
    number: Number,
    contactInfo: String
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

// NEW
app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})

// CREATE
app.post('/posts', (req, res) => {
    Post.create(req.body).then((post) => {
        console.log(post);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})




app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
