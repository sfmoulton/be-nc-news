exports.handle22P02 = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid Text Representation" });
  } else {
    next(err);
  }
};

exports.handle23502 = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(406).send({ message: "invalid post format" });
  } else {
    next(err);
  }
};

//when have more than one psql error handler - refer to Handling Errors in postgreSQL lecture - end

exports.handleCustomError = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  res.status(500).send({msg: 'Internal Server Error'});
}

