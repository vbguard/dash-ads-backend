const Goals = require("../../models/goals.model.js");
const { ValidationError } = require("../../core/error");

const getGoalById = (req, res) => {
  const userId = req.user._id;
  const goalId = req.params.goalId;

  const sendResponse = goal => {
    res.json({
      status: "success",
      goal
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.json({
      status: "error",
      error: errMessage
    });
  };

  Goals.findById({ userId, _id: goalId }, { __v: 0, updatedAt: 0, userId: 0 })
    .then(goal => {
      if (!goal) {
        sendError({ message: "no such goal" });
        return;
      }
      sendResponse(goal);
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getGoalById;
