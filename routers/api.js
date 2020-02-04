const apiRouter = require('express').Router();
const topicsRouter = require('./topics.route');
const usersRouter = require('./users.route');
const articlesRouter = require('./articles.route');
//here we will insert the different routes for our endpoints

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;