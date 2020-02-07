const express = require("express");
const app = express();
const apiRouter = require("./routers/api");
const {
  handlePSQLErrors,
  handleCustomError,
  send405Error,
  handleServerError
} = require("./errors/index");

app.use(express.json()); 

app.use("/api", apiRouter);

app.use(handlePSQLErrors);

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;

//express allows us to seperate the server routes (that may typically all be in app.js) in to smaller subrouters, with multiple express routers
