const apiRouter = require('express').Router();
const topicsRouter = require('./topics.route');
const usersRouter = require('./users.route');
const articlesRouter = require('./articles.route');
const commentsRouter = require('./comments.route');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;