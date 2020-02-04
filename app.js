const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
//error handlers required in

app.use(express.json()); //application-level middleware that will parse incoming request JSON bodies - making them available under the req.body property

app.use('/api', apiRouter);

module.exports = app;

//express allows us to seperate the server routes (that may typically all be in app.js) in to smaller subrouters, with multiple express routers