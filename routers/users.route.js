const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/users.controller');
//then require in our controller functions 

usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;
