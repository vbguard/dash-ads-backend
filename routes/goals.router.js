const router = require("express").Router();

const {
  createGoal,
  getAllUserGoals,
  deleteGoal,
  updateGoal,
  getGoalById
} = require("../controllers/goals/index");

router
  .post("/", createGoal)
  .get("/", getAllUserGoals)
  .get("/:goalId", getGoalById)
  .patch("/:goalId", updateGoal)
  .delete("/:goalId", deleteGoal);

module.exports = router;
