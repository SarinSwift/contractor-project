var exphbs = require('express-handlebars');
const express = require('express')
const methodOverride = require('method-override')

const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contractor-project');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))

const Post = require('./models/post');

const posts = require('./controllers/posts')

// const Post = mongoose.model('Post', {
//     title: String,
//     foodTitle: String,
//     description: String,
//     number: String,
//     contactInfo: String
// });

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
        res.redirect(`/posts/${post._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

// SHOW
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id).then(post => {
        res.render('posts-show', { post: post });
    }).catch((err) => {
        console.log(err.message);
    })
})

// EDIT
app.get('/posts/:id/edit', (req, res) => {
    Post.findById(req.params.id, function(err, post) {
        res.render('posts-edit', {post: post});
    })
})

// UPDATE
app.put('/posts/:id/', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

// DELETE
app.delete('/posts/:id/', function (req, res) {
  console.log("DELETE post")
  Post.findByIdAndRemove(req.params.id).then((post) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;
