const { fetchAllTopics } = require("../models/topics.model");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics().then(topics => {
    res.status(200).send({ topics });
  });
};

//remember we need to destructure our body in our response, we want a key name of topics, with the value of this key being the array of topics objects! { topics }!!
