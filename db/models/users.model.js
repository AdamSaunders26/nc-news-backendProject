const db = require("../connection");
const format = require("pg-format");

exports.selectUsers = (username) => {
  let queryStr = `SELECT * FROM users `;

  !username ? null : (queryStr += format(`WHERE username = %L`, [username]));

  return db.query(queryStr).then(({ rows }) => {
    if (!rows[0]) {
      return Promise.reject({ status: 404, message: "Error: Not Found" });
    }
    return !username ? rows : rows[0];
  });
};
