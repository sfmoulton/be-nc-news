const connection = require("../db/connection");

exports.addArticleComment = (newComment, article_id) => {
  return connection("comments")
    .insert(newComment, "*")
    .then(comment => {
      // if (comment.length === 0) {
      //   return Promise.reject({
      //     status: 404,
      //     msg: "Not Found"
      //   });
      // }

      //need to account for if the article_id is not correct - could we do a promise all? or return article and if length 0 - fail
      return comment[0];
    });
};
