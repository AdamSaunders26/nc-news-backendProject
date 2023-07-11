exports.serverError = (err, req, res, next) => {
  console.log("Error not caught by other error handlers");

  res.status(500).send({ message: "server is broken" });
};

exports.customError = (err, req, res, next) => {
  if (err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

exports.psqlError = (err, req, res, next) => {
  if (err.code) {
    if (err.code == 23503) {
      res.status(404).send({ message: "Error: Not Found" });
    } else {
      res.status(400).send({ message: "Error: Bad Request" });
    }
  } else {
    next(err);
  }
};
