//Insert modules needed for the router
const express = require('express');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const app = express();

//Connect sequelize session to our sequelize db
var myStore = new SequelizeStore({
  db: db.sequelize
});

//set the store to myStore where we connect the DB details
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: myStore
}));

myStore.sync();

app.use(bodyParser.urlencoded({ extended: false }))

//Middleware set up EJS & static
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', './views');



//Routes
app.get('/', (req, res, next) => {
  res.send('Hello World');
});


app.get('/signup', (req, res) => {
  if (req.session.user_id !== undefined) { // check and see if the user has userID
    res.redirect("/survey"); // then send them to the survey page 
    return;
  }
  res.render('signup', { title: 'Sign up here' }) // this allows the request to be sent back to the user 
})

app.post('/signup', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  bcrypt.hash(password, 10, (err, hash) => {// this allows the password to be private
    db.users.create({ name: name, email: email, password_hash: hash }).then((user) => {
      req.session.user_id = user.id;
      res.redirect('/survey')
    });
  });
})

app.get('/survey',(req,res) => {
  if(req.session.user_id != undefined){
    res.render('survey');
  }
})

app.get('/signOut', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

app.get('/home', (req, res, next) => {
  res.render('home');
})

app.get('/userprofile', (req, res, next) => {
  user_id = req.session.user_id;
  db.users.findByPk(user_id).then((user) => {
    const name = user.name;
    const email = user.email;
    res.render('userprofile', {
      name: name,
      email: email,
    });
  })

})

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on port 3000')
})

