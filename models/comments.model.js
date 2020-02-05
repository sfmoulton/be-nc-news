const connection = require("../db/connection");

exports.addArticleComment = (newComment, article_id) => {
  return connection("comments")
    .insert(newComment, "*")
    .then(comment => {
      comment[0].article_id = article_id;
      return comment[0];
    });
};

exports.fetchArticleCommentsById = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  if (order === "asc" || order === "desc") {
    return connection
      .select("*")
      .from("comments")
      .where({ article_id })
      .orderBy(sort_by, order)
      .then(comments => {
        if (comments.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Not Found"
          });
        }
        return comments;
      });
  } else {
    return Promise.reject({
      status: 400,
      msg: "Invalid Order Query"
    });
  }
};

exports.amendCommentVotes = (comment_id, inc_votes) => {
  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, msg: "Bad Request - No inc_votes" });
  }
  return connection("comments")
    .where({ comment_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return comment[0];
    });
};

exports.removeCommentById = comment_id => {
  return connection("comments")
    .where({ comment_id })
    .del("*");
};
