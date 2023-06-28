const db = require("../connection");

exports.selectComments = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.insertCommment = (username, body, article_id) => {
  return typeof body === "string"
    ? db
        .query(
          `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;`,
          [username, body, article_id]
        )
        .then(({ rows }) => {
          return rows[0];
        })
    : Promise.reject({ status: 400, message: "Error: Bad Request" });
};

exports.destroyComment = (comment_id) => {
  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [
    comment_id,
  ]);
};

exports.commentChecker = (comment_id) => {
  return db.query(`SELECT comment_id FROM comments;`).then(({ rows }) => {
    const commentIdArray = rows.map((comment) => {
      return comment.comment_id;
    });
    if (!commentIdArray.includes(Number(comment_id))) {
      return Promise.reject({ status: 404, message: "Error: Not Found" });
    }
  });
};
