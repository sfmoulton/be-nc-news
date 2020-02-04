const articlesRouter = require("express").Router();
const { getArticlesById, updateArticleVotes, postArticleComment } = require("../controllers/articles.controller");

articlesRouter.route("/:article_id").get(getArticlesById).patch(updateArticleVotes);

articlesRouter.route("/:article_id/comments").post(postArticleComment);

module.exports = articlesRouter;
