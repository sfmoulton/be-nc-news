const connection = require("../db/connection");

exports.fetchArticlesById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      return article[0];
    });
};

exports.fetchCommentCountbyArticle = article_id => {
  return connection
    .select("*")
    .from("comments")
    .where({ article_id })
    .then(comments => {
      return comments.length;
    });
};

exports.amendArticleVotes = (article_id, inc_votes) => {
  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, msg: "Bad Request - No inc_votes" });
  }
  return connection("articles")
    .where({ article_id })
    .increment("votes", inc_votes)
    .returning("*")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      return article[0];
    });
};

exports.fetchArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  let withAuthorQuery = queryBuilder => {
    if (author !== undefined) {
      queryBuilder.where("articles.author", author);
    }
  };

  let withTopicQuery = queryBuilder => {
    if (topic !== undefined) {
      queryBuilder.where("articles.topic", topic);
    }
  };

  if (order === "asc" || order === "desc") {
    return connection
      .select("articles.*")
      .from("articles")
      .orderBy(sort_by, order)
      .count({ comment_count: "comments.article_id" })
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .modify(withAuthorQuery)
      .modify(withTopicQuery);
  } else {
    return Promise.reject({
      status: 400,
      msg: "Invalid Order Query"
    });
  }
};
