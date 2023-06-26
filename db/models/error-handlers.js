exports.serverError = (err, req, res, next) => {
  console.log("Error not caught by other error handlers");
  res.status(500).send({ message: "server is broken" });
};
