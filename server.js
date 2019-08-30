//Insert modules needed for the router
// const key = require('./keys')
const express = require('express');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

var jsonParser = bodyParser.json()
// replace
var FAKEVARIABLE = {
  session: {
    loading: {}
  }
}


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

app.get('/loading/:id', (req, res, next) => {
  let id = req.params.id;
  FAKEVARIABLE.session.loading.id = true
  res.render('loading', { id: id });
});

app.get('/listing/:id', (req, res, next) => {
  console.log("this works too")
  let id = req.params.id;
  console.log(FAKEVARIABLE.session.id);
  res.render('listing', { info: FAKEVARIABLE.session.id });
});

app.get('/check/:id', (req, res, next) => {
  let id = req.params.id;
  if (id in FAKEVARIABLE.session) {
    res.json({ success: true, status: 200 });
  } else {
    res.json({ success: false, status: 401 });
  }
});

app.post('/listing/:id', jsonParser, (req, res, next) => {
  let id = req.params.id;
  FAKEVARIABLE.session.id = req.body;
  res.json({ success: "Updated Successfully", status: 200 });
});


app.post('/signup', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  bcrypt.hash(password, 10, (err, hash) => {// this allows the password to be private
    db.user.create({ name: name, email: email, password_hash: hash }).then((user) => {
      req.session.user_id = user.id;
      res.redirect('/home')
    })
  })
})

const port = 3003;

app.listen(port, () => {
  console.log(`Server On ${port}`);
});


console.log()