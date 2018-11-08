//posts.js

module.exports = function(app, Post) {

    app.get('/', (req, res) => {
        Post.find().then(posts => {
            res.render('posts-index', {posts: posts});
        }).catch(err => {
            console.log(err);
        });
    });

}
