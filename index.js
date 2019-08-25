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


/* 
  !GET ROUTES
  TODO: Implement all of the GET routes
*/
app.get('/', (req, res, next) => {
  res.redirect('/welcome');
})

app.get('/welcome', (req, res, next) => {
  if (req.session.userId !== undefined) {
    res.render('welcome', { 'isAuthenticated': true })
  } else {
    res.render('welcome', { 'isAuthenticated': false })
  }
})

app.get('/home', (req, res, next) => {
  res.render('home');
});

app.get('/login', (req, res, next) => {
  res.render('login', { error_message: '' })
})

app.get('/signup', (req, res) => {
  if (req.session.userId !== undefined) { // check and see if the user has userID
    res.redirect("/survey"); // then send them to the survey page 
    return;
  }
  res.render('signup', { title: 'Sign up here' }) // this allows the request to be sent back to the user 
})


//! POST ROUTES
app.post('/signup', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  bcrypt.hash(password, 10, (err, hash) => {// this allows the password to be private
    db.users.create({ name: name, email: email, passwordHash: hash }).then((user) => {
      req.session.userId = user.id;
      res.redirect('/')
    })
  })
})

app.post('/login', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password
  db.users.findOne({ where: { email: email } }).then(user => {
    if (user === null) {
      res.render('login', { error_message: "Please check your username & password" })
    } else {
      bcrypt.compare(password, user.passwordHash, function (err, matched) {
        if (matched) {
          req.session.userId = user.id
          res.render('userprofile', {
            name: user.name,
            email: user.email
          });
        } else {
          res.render("login", { error_message: "Please check your username & password" })
        }
      })
    }
  })
})

app.get('/signOut', (req, res, next) => {
  req.session.destroy()
  res.redirect('/login')
})

app.get('/userprofile', (req, res, next) => {
  user_id = req.session.userId;
  db.users.findByPk(user_id).then((user) => {
    const name = user.name;
    const email = user.email;
    console.log(name);

    res.render('userprofile', {
      name: name,
      email: email,
    });
  })

})

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on port 3000');
});




//! Apollo set up
const { ApolloServer, gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
models = db
const apolloServ = new ApolloServer({ typeDefs, resolvers, context: { models } })
apolloServ.applyMiddleware({ app })

module.exports = db;