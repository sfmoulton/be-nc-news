const commentsRouter = require("express").Router();
const {
  updateCommentVotes,
  deleteCommentById
} = require("../controllers/comments.controller");
const { send405Error } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVotes)
  .delete(deleteCommentById)
  .all(send405Error);

module.exports = commentsRouter;
