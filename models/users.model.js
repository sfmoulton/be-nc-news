const connection = require("../db/connection");



exports.fetchUserByUsername = username => {
  return connection
  .select("*")
  .from('users')
  .where({ username })
  .then(user => {
    if (user.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    else return user[0];
  });
};

exports.checkUserByUsername = username => {
  
  if (username === undefined) {
    return true;
  }
  return connection
      .select("*")
      .from("users")
      .where({ username })
      .then(user => {
        if (user.length === 0) {
          return Promise.reject({ status: 404, msg: "Queried Author Not Found" });
        } else return user[0];
      });
}
