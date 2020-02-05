// exports.handlePSQLErrors = (err, req, res, next) => {
//   if (err.code !== undefined) {
//     const pSQLErrors = {
//       "22P02": { status: 400, msg: "Invalid Test Representation" },
//       23502: { status: 406, msg: "Request Format Not Acceptable" },
//       42703: { status: 400, msg: "Bad Request - Undefined Column Key" }
//     };
//     res.status(pSQLErrors[err.code].status).send({msg});
//   } else {
//     next (err)}
// };

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
