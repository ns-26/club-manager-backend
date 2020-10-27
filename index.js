const express = require('express'),
  app = express(),
  port = 8000,
  path = require('path');

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server:${err}`);
  }
  console.log(`Server is running on port:${port}`);
});
