const connection = require("../db/connection"); //here will be querying our db directly, which is why we have to create this connection object ourselves

exports.fetchAllTopics = () => {
  return connection.select("*").from("topics");
};
