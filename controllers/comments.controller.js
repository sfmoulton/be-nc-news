const {
  amendCommentVotes,
  removeCommentById,
  checkComment
} = require("../models/comments.model");

exports.updateCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  amendCommentVotes(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  return Promise.all([removeCommentById(comment_id), checkComment(comment_id)])
    .then(([commentToDelete, comment]) => {
      res.status(204).send({ commentToDelete });
    })
    .catch(next);
};
