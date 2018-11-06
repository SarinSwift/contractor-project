const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

let posts = [
    { title: "Homemade organic cookies", foodTitle: "Good for all ages!" },
    { title: "Organic acai powder", foodTitle: "Easily blend formula" }
]

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// INDEX
app.get('/', (req, res) => {
    res.render('posts-index', { posts: posts });
})




app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
