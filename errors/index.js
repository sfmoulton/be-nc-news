exports.handle22P02 = (err, req, res, next) => {
  //console.log("handle22P02");
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Text Representation" });
  } else {
    next(err);
  }
};

exports.handle23502 = (err, req, res, next) => {
  //console.log("handle23502");
  if (err.code === "23502") {
    res.status(406).send({ msg: "Request Format Not Acceptable" });
  } else {
    next(err);
  }
};

exports.handle42703 = (err, req, res, next) => {
  //console.log("handle42703");
  if (err.code === "42703") {
    res.status(400).send({ msg: "Bad Request - Undefined Column Key" });
  } else {
    next(err);
  }
};

//when have more than one psql error handler - refer to Handling Errors in postgreSQL lecture - end

exports.handleCustomError = (err, req, res, next) => {
  //console.log("handleCustomError");
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  //console.log("handleServerError");
  res.status(500).send({ msg: "Internal Server Error" });
};
