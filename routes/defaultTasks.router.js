const router = require("express").Router();

const {
  createDefaultTasks,
  getAllDefaultTasks,
  deleteDefaultTaskById,
  updateDefaultTask,
  getDefaultTaskById
} = require("../controllers/defaultTasks");

router
  .get("/", getAllDefaultTasks)
  .get("/:taskId", getDefaultTaskById)
  .post("/", createDefaultTasks)
  .patch("/:taskId", updateDefaultTask)
  .delete("/:taskId", deleteDefaultTaskById);

module.exports = router;
