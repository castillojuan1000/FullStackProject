//Insert modules needed for the router
const key = require('./keys')
const express = require('express');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

//Middleware set up EJS & static
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', './views');



//Routes
app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.get('/hello', (req, res, next) => {
  res.render('home', {})
});

app.get('/listing/:id', (req, res, next) => {
    let id = req.body.id;
    console.log(id);
    res.render('listing', {});
});


app.post('/signup', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  bcrypt.hash(password, 10, (err, hash) => {// this allows the password to be private
    db.user.create({ name: name, email: email, password_hash: hash }).then((user) => {
      req.session.user_id = user.id;
      res.redirect('/where?')
    })
  })
})

const port = 3003;

app.listen(port, () =>{
  console.log(`Server On ${port}`);
});

