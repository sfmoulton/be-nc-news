const connection = require("../db/connection");

exports.fetchArticlesById = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where({ article_id })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
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
  return connection("articles").where({ article_id }).increment('votes', inc_votes).returning('*').then(article => {
    if (article.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return article[0];
  });
};


