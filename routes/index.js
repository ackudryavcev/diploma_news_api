const routes = require('express').Router();
const Error404 = require('../errors/error404');
const auth = require('../middlewares/auth');
const articles = require('./articles');
const users = require('./users');
const authroute = require('./usersauth');

routes.use('/', authroute, auth, articles, users);

routes.use('*', (req, res, next) => {
  next(new Error404('Ресурс не найден'));
});

module.exports = routes;
