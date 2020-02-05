const commentsRouter = require("express").Router();
const {
  updateCommentVotes,
  deleteCommentById
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVotes)
  .delete(deleteCommentById);

module.exports = commentsRouter;
