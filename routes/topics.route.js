const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics.controller");
//then require in our controller functions 

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;
