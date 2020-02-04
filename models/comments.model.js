const connection = require("../db/connection");

exports.addArticleComment = (newComment, article_id) => {
  
  return connection('comments').insert(newComment, '*').then(comment => {
    return comment[0];
  });
};

