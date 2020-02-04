const express = require("express");
const app = express();
const apiRouter = require("./routers/api");
//error handlers required in

app.use(express.json()); //application-level middleware that will parse incoming request JSON bodies - making them available under the req.body property
//this has to go before our router, to make sure the body is parsed!

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const { status, msg } = err;
  res.status(status).send({ msg });
});

module.exports = app;

//express allows us to seperate the server routes (that may typically all be in app.js) in to smaller subrouters, with multiple express routers
