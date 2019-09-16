const router = require("express").Router();
const passport = require("passport");

const authRouter = require("./auth.router");
const goalsRouter = require("./goals.router");
const tasksRouter = require("./tasks.router");
const userRouter = require("./user.router");
const defaultTasksRouter = require("./defaultTasks.router");

const passportCheck = passport.authenticate("jwt", {
  session: false
});

router
  .use("/auth", authRouter)
  .use("/goals", passportCheck, goalsRouter)
  .use("/tasks", passportCheck, tasksRouter)
  .use("/user", userRouter)
  .use("/defaultTasks", defaultTasksRouter);

module.exports = router;
