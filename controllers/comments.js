// controllers/comments.js

module.exports = (app, Comment) => {

    // NEW Comment
    app.post('/posts/comments', (req, res) => {
        res.send('posts comment')
    })

    // DELETE
    app.delete('/posts/comments/:id', function (req, res) {
        console.log('DELETE comment')
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/posts/${comment.postId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
