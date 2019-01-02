var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');

/**
 * Defining app
 */
var app = express();

app.set('views', path.join(__dirname, 'views')); // Pour le dossier de render
app.set('view engine', 'ejs'); // Render les ejs
app.use(express.static(path.join(__dirname, 'public'))); // Pour l'utilisation dans les views, on démarre de public
app.use(express.static(path.join(__dirname, 'node_module/socket.io-client'))); // Pour socket.io
app.use(logger('dev')); // Logger
app.use(logger('common', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
/**
 * Routes
 */
var index = require('./routes/index');
var play = require('./routes/play');
app.use('/', index);
app.use('/play', play);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found'); // Le texte de l'erreur
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500); // Si l'erreur n'a pas été traité avant on met 500
    res.render('error', {status: err.status, message: err.message});
});

module.exports = app;
