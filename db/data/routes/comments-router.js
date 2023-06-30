const {
  getComments,
  postComment,
  deleteComment,
} = require("../../controllers/comments.controller");

const commentsRouter = require("express").Router();
console.log("ehre");

commentsRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment);
commentsRouter.delete("/:comment_id", deleteComment);

module.exports = commentsRouter;
