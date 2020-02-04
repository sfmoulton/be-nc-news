const apiRouter = require('express').Router();
const topicsRouter = require('./topics.route');
const usersRouter = require('./users.route');
//here we will insert the different routes for our endpoints

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;