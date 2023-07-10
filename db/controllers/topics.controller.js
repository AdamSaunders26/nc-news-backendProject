const { selectTopics, insertTopic } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  const { body } = req;
  insertTopic(body)
    .then((postedTopic) => {
      res.status(201).send({ postedTopic });
    })
    .catch(next);
};
