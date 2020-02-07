const {
  fetchArticlesById,
  fetchCommentCountbyArticle,
  amendArticleVotes,
  fetchArticles
} = require("../models/articles.model");
const {
  addArticleComment,
  fetchArticleCommentsById
} = require("../models/comments.model");
const { checkUserByUsername } = require("../models/users.model");
const { checkTopic } = require("../models/topics.model");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  amendArticleVotes(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postArticleComment = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;

  addArticleComment(newComment, article_id)
    .then(comment => {
      if (comment.author === null) {
        return Promise.reject({ status: 400, msg: "Bad Request - Username Not Assigned to Comment" });
      }

      res.status(201).send({ comment });
    })

    .catch(next);
};

exports.getArticleCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  return Promise.all([
    fetchArticleCommentsById(article_id, sort_by, order),
    fetchArticlesById(article_id)
  ])
    .then(([comments, article]) => {
      if (article === undefined) {
        return Promise.reject({
          status: 404,
          msg: "Article Not Found"
        });
      }
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;

  return Promise.all([
    fetchArticles(sort_by, order, author, topic),
    checkUserByUsername(author),
    checkTopic(topic)
  ])
    .then(([articles, user, topic]) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
