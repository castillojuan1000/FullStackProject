var express = require('express');

var app = express();


app.get('/', (req, res, next) => {
  res.send('Hello World');
})


var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});