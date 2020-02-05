const commentsRouter = require("express").Router();
const {updateCommentVotes} = require('../controllers/comments.controller');

commentsRouter.route('/:comment_id').patch(updateCommentVotes);

module.exports = commentsRouter;