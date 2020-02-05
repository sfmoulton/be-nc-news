const {
  fetchArticlesById,
  fetchCommentCountbyArticle,
  amendArticleVotes
} = require("../models/articles.model");
const {
  addArticleComment,
  fetchArticleCommentsById
} = require("../models/comments.model");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;

  return Promise.all([
    fetchArticlesById(article_id),
    fetchCommentCountbyArticle(article_id)
  ])
    .then(([article, commentCount]) => {
      //need to remember to destructure the Promise.all result here!
      article.comment_count = commentCount;
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

  return Promise.all([
    addArticleComment(newComment, article_id),
    fetchArticlesById(article_id)
  ])
    .then(([comment, article]) => {
      if (article === undefined) {
        return Promise.reject({
          status: 404,
          msg: "Not Found"
        });
      }
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getArticleCommentsById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleCommentsById(article_id).then(comments => {
    res.status(200).send({ comments });
  });
};
