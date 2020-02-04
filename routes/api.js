const apiRouter = require('express').Router();
const topicsRouter = require('./topics.route');
//here we will insert the different routes for our endpoints

apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;