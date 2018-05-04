const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('X-Powered-By', false);
app.set('json escape', true);

// Is this Server behind a Proxy, like Nginx?

// app.enable('trust proxy');
//app.set('trust proxy', () =>return true);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
process.env.song = 'none';
app.get('/', (req, res) => {
    if(process.env.song === 'none'){
        return res.json({song: 'none'})
    }
    res.json(JSON.parse(process.env.song));
});

app.get('/dust', require('./actions/weather/dust'))


// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// Throw the Errors on 'em !
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    let error = {Error: {StatusCode: err.status || 500, error: err.message}};
    res.json(error);
});

module.exports = app;
