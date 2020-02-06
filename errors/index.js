exports.handlePSQLErrors = (err, req, res, next) => {
  //console.log("handlePSQLErrors");
  if (err.code !== undefined) {
    const pSQLErrors = {
      "22P02": { status: 400, msg: "Invalid Text Representation" },
      "23502": { status: 406, msg: "Request Format Not Acceptable" },
      "42703": { status: 400, msg: "Bad Request - Undefined Column Key" },
      "42702" : {status: 400, msg: "Ambiguous column"}
    };
    res
      .status(pSQLErrors[err.code].status)
      .send({ msg: pSQLErrors[err.code].msg });
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  //console.log("handleCustomError");
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleServerError = (err, req, res, next) => {
  //console.log("handleServerError");
  res.status(500).send({ msg: "Internal Server Error" });
};
