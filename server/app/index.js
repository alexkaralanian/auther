'use strict';

var app = require('express')();
var router = require('express').Router();
var path = require('path');
var User = require('../api/users/user.model');


// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

app.use(require('./session.middleware'));


// "Responding" middleware (may send a response back to client)
app.use('/api', require('../api/api.router'));
app.use('/login', require('./login'));


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));

module.exports = app;
