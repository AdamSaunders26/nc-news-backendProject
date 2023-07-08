const {
  getComments,
  postComment,
  deleteComment,
  patchComment,
} = require("../controllers/comments.controller")
    

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:article_id/comments")
  .get(getComments)
  .post(postComment);
commentsRouter.route("/:comment_id").delete(deleteComment).patch(patchComment);

module.exports = commentsRouter;
