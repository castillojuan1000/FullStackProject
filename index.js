//Insert modules needed for the router
const express = require('express');
const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const app = express();



//Middleware set up EJS & static
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', './views');



//Routes
app.get('/', (req, res, next) => {
  res.json('Hello World');
});



app.listen(process.env.PORT || 3000, function () {
  console.log('Server running on port 3000');
});