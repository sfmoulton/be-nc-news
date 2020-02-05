const connection = require("../db/connection");

exports.addArticleComment = (newComment, article_id) => {
  return connection("comments")
    .insert(newComment, "*")
    .then(comment => {
      comment[0].article_id = article_id;
      return comment[0];
    });
};

//, 