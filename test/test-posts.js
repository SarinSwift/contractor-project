// test-posts.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Post = require('../models/post');

chai.use(chaiHttp);

const samplePost =      {
        "title": "Cookie",
        "foodTitle": "Homemade healthy cookie",
        "description": "Uses all natural ingredients",
        "number": "415-583-4373",
        "contactInfo": "sarinyaswift@gmail.com"
}

describe('Posts', () => {

    after(() => {
        Post.deleteMany({title: 'Super sweet post'}).exec((err, posts) => {
            console.log(posts)
            posts.remove();
        })
    });

    // TEST INDEX
    it('should index ALL posts on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST NEW
    it('should display new post form on /posts/new GET', (done) => {
        chai.request(server)
            .get(`/posts/new`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST SHOW
    it('should show a SINGLE post on /posts/<id> GET', (done) => {
        var post = new Post(samplePost);
        post.save((err, data) => {
            chai.request(server)
                .get(`/posts/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST EDIT
    it('should edit a SINGLE post on /posts/<id>/edit  GET', (done) => {
        var post = new Post(samplePost);
        post.save((err, data) => {
            chai.request(server)
                .get(`/posts/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST CREATE
    it('should create a SINGLE post on /posts POST', (done) => {
        chai.request(server)
            .post('/posts')
            .send(samplePost)
            .end((err, res) => {
                res.should.have.status(200)
                res.should.be.html
                done();
            });
    });

    // TEST UPDATE
    it('should update a single post on /posts/<id> PUT', (done) => {
        var post = new Post(samplePost);
        post.save((err, data) => {
            chai.request(server)
                .put(`/posts/${data._id}?_method=PUT`)
                .send({'title': 'Updating the title'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST DELETE
    it('should DELETE a single post on /posts/<id> DELETE', (done) => {
        var post = new Post(samplePost);
        post.save((err, data) => {
            chai.request(server)
                .delete(`/posts/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

});
