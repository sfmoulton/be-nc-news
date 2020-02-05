const articlesRouter = require("express").Router();
const {
  getArticlesById,
  updateArticleVotes,
  postArticleComment,
  getArticleCommentsById,
  getArticles
} = require("../controllers/articles.controller");

articlesRouter.route('/').get(getArticles);

articlesRouter.route("/:article_id").get(getArticlesById).patch(updateArticleVotes);

articlesRouter.route("/:article_id/comments").post(postArticleComment).get(getArticleCommentsById);

module.exports = articlesRouter;
