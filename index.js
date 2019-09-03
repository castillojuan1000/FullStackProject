//Insert modules needed for the router
const express = require("express");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const app = express();
const surveyJSON = require("./surveySet");

// body parser json
const jsonParser = bodyParser.json()

//* Amazon aws
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

console.log(process.env.DBURL)

//Connect sequelize session to our sequelize db
const myStore = new SequelizeStore({
  db: db.sequelize
});

//set the store to myStore where we connect the DB details
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: myStore
  })
);

myStore.sync();

app.use(bodyParser.urlencoded({ extended: false }));



//Middleware set up EJS & static
app.use(express.static(path.join(__dirname, "/public/")));
app.set("view engine", "ejs");
app.set("views", "./views");

/* 
  !GET ROUTES
  TODO: Implement all of the GET routes
*/
if (process.env.NODE_ENV == 'production') {
  app.use(function (req, res, next) {
    if (req.session.userId !== undefined) {
      next()
    } else if (req.path == "/login" || req.path == "/signup") {
      next()
    } else {
      res.redirect('/login');
    }
  })
}
app.get("/", (req, res, next) => {
  res.redirect("/welcome");
});

app.get("/welcome", (req, res, next) => {
  if (req.session.userId !== undefined) {
    res.render("welcome", { isAuthenticated: true });
  } else {
    res.render("welcome", { isAuthenticated: false });
  }
});

app.get("/home", (req, res, next) => {
  res.render("home");
});

app.get("/login", (req, res, next) => {
  res.render("login", { error_message: "" });
});

app.get("/signup", (req, res) => {
  if (req.session.userId !== undefined) {
    // check and see if the user has userID
    res.redirect("/profile");
    return;
  }
  res.render("signup", { error: "" }); // this allows the request to be sent back to the user
});

//******* Sign Out Route ********************
app.get("/signOut", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get("/survey", (req, res, next) => {
  const userId = req.session.userId
  console.log(userId)
  res.render("survey", { user: userId });
});

app.get("/surveyData", (req, res, next) => {
  res.json(surveyJSON);
});

//******* User Profile Routes ********************
app.get("/userprofile", (req, res, next) => {
  user_id = req.session.userId;
  db.users.findByPk(user_id).then(user => {
    console.log(user.phoroUrl);
    const { name, email, photo_url } = user;
    res.render("userprofile", {
      name: name,
      email: email,
      id: user_id,
      photo: photo_url
    });
  });
});

app.get("/reset", (req, res) => {
  db.users
    .findOne({
      where: {
        resetPasswordToken: req.query.token
      }
    })
    .then(user => {
      if (user == null) {
        res.json("Password reset link is invalid or has expired");
      } else {
        req.session.userId = user.id;
        res.render("reset", { email: user.email });
      }
    });
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPass", { message: "" });
});

//! POST ROUTES
app.post("/forgotPassword", (req, res) => {
  console.log(req.body.email);
  if (req.body.email === "") {
    res.render("forgotPass", { message: "Please enter an email." });
  } else {
    db.users
      .findOne({ where: { email: req.body.email } })
      .then(async user => {
        if (user.email === undefined) {
          res.render("forgotPass", {
            message: "I couldn't find that email in my records"
          });
        } else {
          const token = crypto.randomBytes(20).toString("hex");
          user.update({
            resetPasswordToken: token
          });
          const transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            auth: {
              user: "apikey",
              pass: process.env.SENDGRIDAPIKEY
            }
          });
          const mailOptions = {
            from: "noreply@giftToYou.ga",
            to: req.body.email,
            subject: "GiftToYou password reset",
            html: `<p>You are receiving this because your (or someone else) has requested the pasword for your account
          to be reset. Please click the following link to complete the proccess and reset your password.<br> <a href="http://localhost:3000/reset/?token=${token}">Click here</a><br><br>
          If you did not request this, please ignore this email and your password will not be changed.</p>`
          };
          await transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
              console.error("there was an error: ", err);
            } else {
              console.log("Sent Email");
            }
          });
        }
      })
      .then(() => {
        res.render("forgotPass", { message: "Recovery email sent." });
      })
      .catch(() => {
        res.render("forgotPass", { message: "Email not found!" });
      });
  }
});
app.post("/signup", (req, res, next) => {
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var name = req.body.name;
  bcrypt.hash(password, 10, (err, hash) => {
    // this allows the password to be private
    db.users
      .create({ name: name, email: email.toLowerCase(), passwordHash: hash })
      .then(user => {
        req.session.userId = user.id;
        res.redirect("/");
      })
      .catch(err => {
        res.render("signup", { error: "This email already exist" });
      });
  });
});

app.post("/login", (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  db.users.findOne({ where: { email: email } }).then(user => {
    if (user === null) {
      res.render("login", {
        error_message: "Please check your username & password"
      });
    } else {
      bcrypt.compare(password, user.passwordHash, function (err, matched) {
        if (matched) {
          req.session.userId = user.id;
          const { id, name, email, photo_url } = user;
          res.render("userprofile", {
            id: id,
            name: name,
            email: email,
            photo: photo_url
          });
        } else {
          res.render("login", {
            error_message: "Please check your username & password"
          });
        }
      });
    }
  });
});
app.post("/updatePassword", (req, res) => {
  db.users
    .findOne({
      where: {
        id: req.session.userId
      }
    })
    .then(user => {
      if (user.name != undefined) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          user.update({
            passwordHash: hash,
            resetPasswordToken: null
          });
        });
        return user;
      }
    })
    .then(user => {
      req.session.userId = user.id;
      res.render("welcome", { isAuthenticated: true });
    });
});

app.post("/upload", (req, res, next) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let profilePic = req.files.profilePic;
  let fileName =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  let user_id = req.session.user_id;
  const params = {
    Bucket: "gifttoyoupics",
    Key: `${fileName}.jpeg`,
    Body: profilePic.data,
    ACL: "public-read"
  };
  s3.upload(params, function (Err, data) {
    if (Err) throw Err;
    console.log(data.Location); //Logs the url to the s3 upload
    db.users.findOne({ where: { id: user_id } }).then(user => {
      user.update({ photo_url: `${data.Location}` }).then(() => {
        res.json("Uploaded new pic");
      });
    });
  });
});

app.get('/search', (req, res, next) => {
  let auth;
  (req.session.userId) ? auth = true : auth = false
  req.session.store = {};
  req.session.loading = {};
  res.render('home', {auth: auth})
});

app.get('/loading/:id', (req, res, next) => {
  let id = req.params['id'];
  req.session.loading.id = true
  res.render('loading', {id : id});
});

app.get('/listing/:id', (req, res, next) => {
    let auth;
    (req.session.userId) ? auth = true : auth = false;

    let id = req.params.id;
    res.render('listing', {info : req.session.store[id], auth : auth});
});

app.get('/check/:id', (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  if (req.session.store.hasOwnProperty(id)) {
    console.log("id in req.session")
    res.json({success : true, status : 200});
  } else {
    console.log("its not")
    res.json({success : false, status : 401});
  }
});

app.post('/listing/:id', jsonParser, (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  req.session.store[id] = req.body;
  res.json({success : "Updated Successfully", status : 200});
});



//!Server Port
app.listen(process.env.PORT || 3000, function () {
  console.log("Server running on port 3000");
});

//! Apollo set up
const { ApolloServer, gql } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
models = db;
const apolloServ = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});
apolloServ.applyMiddleware({ app });
