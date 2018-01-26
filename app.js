var express = require('express');
var debug = require('debug')('personotes:server');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./application/config');
var routes = require('./application/router');


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    cookie:{
        maxAge: 1000*60*30
    }
}));

app.BASE_DIR = __dirname;
app.DEBUG = debug;
config._init_(app);
routes._init_(app);


module.exports = app;
