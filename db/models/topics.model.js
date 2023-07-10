const db = require("../connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows }) => {
    return rows;
  });
};

exports.insertTopic = (topicToPost) => {
  return db
    .query(
      `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *`,
      [topicToPost.slug, topicToPost.description]
    )
    .then((postedTopic) => {
      return postedTopic.rows[0];
    });
};
