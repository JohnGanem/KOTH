var express = require('express');
var path = require('path');
var logger = require('morgan');
var index = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Pour le render
app.set('view engine', 'ejs'); // Render les ejs

// set path for static assets
app.use(express.static(path.join(__dirname, 'public'))); // Pour l'utilisation dans les views

// routes
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found'); // Le texte de l'erreur
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500); // Si l'erreur n'a pas été traité avant on met 500
  res.render('error', {status:err.status, message:err.message});
});

module.exports = app;
