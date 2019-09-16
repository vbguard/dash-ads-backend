const router = require("express").Router();

const {
  createTask,
  deleteTask,
  getAllUserTasks,
  getTaskById,
  updateTask
} = require("../controllers/tasks/index");

router
  .get("/", getAllUserTasks)
  .get("/:taskId", getTaskById)
  .post("/", createTask)
  .patch("/:taskId", updateTask)
  .delete("/:taskId", deleteTask);

module.exports = router;
