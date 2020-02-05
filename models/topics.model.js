const connection = require("../db/connection"); //here will be querying our db directly, which is why we have to create this connection object ourselves

exports.fetchAllTopics = () => {
  return connection.select("*").from("topics");
};

exports.checkTopic = topic => {
  if (topic === undefined) {
    return true;
  }
  return connection
    .select("*")
    .from("topics")
    .where("topics.slug", topic)
    .then(topic => {
      if (topic.length === 0) {
        return Promise.reject({ status: 404, msg: "Queried Topic Not Found" });
      } else return topic[0];
    });
};
