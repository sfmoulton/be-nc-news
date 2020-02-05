const express = require("express");
const app = express();
const apiRouter = require("./routers/api");
const {
  handle22P02,
  handle23502,
  handle42703,
  handleCustomError,
  handleServerError
} = require("./errors/index");


app.use(express.json()); //application-level middleware that will parse incoming request JSON bodies - making them available under the req.body property
//this has to go before our router, to make sure the body is parsed!

app.use("/api", apiRouter);

app.use(handle22P02);

app.use(handle23502);

app.use(handle42703);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;

//express allows us to seperate the server routes (that may typically all be in app.js) in to smaller subrouters, with multiple express routers
