const db = require("../connection");
const format = require("pg-format");

exports.selectArticles = (query) => {
  //safelists for queries
  const topicSafelist = [
    "mitch",
    "cats",
    "paper",
    "coding",
    "football",
    "cooking",
  ];
  const sortbySafelist = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const orderSafelist = ["asc", "desc"];

  //to allow single articles and all articles
  const article = !query.article_id ? `` : `articles.body, `;

  //base query to be added to
  let queryStr = `SELECT articles.article_id, articles.title, articles.topic, articles.author, ${article} articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id `;

  if (query.hasOwnProperty("topic") && topicSafelist.includes(query.topic)) {
    queryStr += `WHERE topic = '${query.topic}' `;
  } else if (
    query.hasOwnProperty("article_id") &&
    query.article_id.toString() !== "NaN"
  ) {
    queryStr += `WHERE articles.article_id = ${query.article_id} `;
  } else if (
    query.hasOwnProperty("topic") &&
    !topicSafelist.includes(query.topic)
  ) {
    return Promise.reject({ status: 404, message: "Error: Not Found" });
  }
  queryStr += `GROUP BY articles.article_id `;

  if (query.hasOwnProperty("sortby") && sortbySafelist.includes(query.sortby)) {
    queryStr += `ORDER BY ${query.sortby} `;
  } else if (
    query.hasOwnProperty("sortby") &&
    !sortbySafelist.includes(query.sortby)
  ) {
    return Promise.reject({ status: 404, message: "Error: Not Found" });
  } else {
    queryStr += `ORDER BY created_at `;
  }

  if (query.hasOwnProperty("order") && orderSafelist.includes(query.order)) {
    queryStr += ` ${query.order}`;
  } else if (
    query.hasOwnProperty("order") &&
    !orderSafelist.includes(query.order)
  ) {
    return Promise.reject({ status: 400, message: "Error: Bad Request" });
  } else {
    queryStr += `DESC `;
  }

  return db.query(queryStr).then(({ rows }) => {
    //pagination
    if (query.hasOwnProperty("limit") || query.hasOwnProperty("p")) {
      !query.limit ? (query.limit = 10) : null;
      !query.p ? (query.p = 1) : null;
      const startSlice = query.limit * query.p - query.limit;
      const endSlice = query.limit * query.p;
      return endSlice.toString() === "NaN"
        ? Promise.reject({ status: 400, message: "Error: Bad Request" })
        : {
            articles: rows.slice(startSlice, endSlice),
            totalCount: rows.length,
          };
    } else {
      return !query.article_id
        ? { articles: rows, totalCount: rows.length }
        : { articles: rows[0], totalCount: rows.length };
    }
  });
};

exports.updateArticles = (inc_votes, article_id) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING * ;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.articleChecker = (article_id) => {
  return db
    .query(
      `SELECT articles.article_id, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY article_id ASC;`
    )
    .then((output) => {
      const commentLookup = {};
      output.rows.map((element) => {
        commentLookup[element.article_id] = element.comment_count;
      });
      if (!article_id) {
        return;
      }

      if (Number(article_id).toString() === "NaN") {
        return Promise.reject({ status: 400, message: "Error: Bad Request" });
      }

      if (!Object.keys(commentLookup).includes(article_id)) {
        return Promise.reject({ status: 404, message: "Error: Not Found" });
      }
    });
};

exports.insertArticle = (article) => {
  const query = format(
    `INSERT INTO articles (author, title, body, topic) VALUES (%L); SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.body) AS comment_count FROM articles LEFT OUTER JOIN comments ON articles.article_id = comments.article_id WHERE articles.title = %L GROUP BY articles.article_id; `,
    [article.author, article.title, article.body, article.topic],
    [article.title]
  );

  return db.query(query).then((output) => {
    return output[1].rows[0];
  });
};

exports.destroyArticle = async (article_id) => {
  const commentsLookup = await db
    .query(
      `SELECT articles.article_id, COUNT(comments.body) FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.article_id ASC;`
    )
    .then(({ rows }) => {
      const newObj = {};
      rows.forEach((row) => {
        newObj[row.article_id] = row.count;
      });
      return newObj;
    });

  if (!commentsLookup.hasOwnProperty(article_id)) {
    if (Number(article_id).toString() === "NaN") {
      return Promise.reject({ status: 400, message: "Error: Bad Request" });
    } else {
      return Promise.reject({ status: 404, message: "Error: Not Found" });
    }
  } else {
    return db
      .query(`DELETE FROM comments WHERE article_id = $1;`, [article_id])
      .then(() => {
        return db.query(
          `DELETE FROM articles WHERE article_id = $1 RETURNING *;`,
          [article_id]
        );
      })
      .then(({ rows }) => {
        return rows[0].article_id == article_id
          ? null
          : Promise.reject({ status: 400, message: "Error: Bad Request" });
      });
  }
};
