const { selectUsers } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  const { username } = req.params;

  selectUsers(username)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};
