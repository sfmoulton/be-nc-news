const articlesRouter = require("express").Router();
const {
  getArticlesById,
  updateArticleVotes,
  postArticleComment,
  getArticleCommentsById,
  getArticles,
  postArticle,
  deleteArticleById
} = require("../controllers/articles.controller");
const { send405Error } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getArticles)
  .post(postArticle)
  .all(send405Error);

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(updateArticleVotes)
  .delete(deleteArticleById)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(postArticleComment)
  .get(getArticleCommentsById)
  .all(send405Error);

module.exports = articlesRouter;
