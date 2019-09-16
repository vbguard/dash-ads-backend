const Goals = require("../../models/goals.model.js");
const User = require("../../models/user.model.js");

const { ValidationError } = require("../../core/error");

const deleteGoal = (req, res) => {
  const userId = req.user._id;
  const goalId = req.params.goalId;

  const sendResponse = () => {
    res.json({
      status: "success"
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

  Goals.findByIdAndDelete({ userId, _id: goalId })
    .then(goal => {
      if (!goal) {
        sendError({ message: "No such goal" });
      }
      User.findByIdAndUpdate(userId, { $pull: { goals: goalId } })
        .then(sendResponse)
        .catch(err => {
          throw new ValidationError(err.message);
        });
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = deleteGoal;
