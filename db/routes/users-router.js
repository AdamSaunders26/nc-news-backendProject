const { getUsers } = require("../controllers/users.controller");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);
userRouter.get("/:username", getUsers);

module.exports = userRouter;
