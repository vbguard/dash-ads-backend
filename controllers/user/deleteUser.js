const User = require("../../models/user.model");
const Tasks = require("../../models/tasks.model.js");
const Goals = require("../../models/goals.model.js");

const deleteUser = (req, res) => {
  const userId = req.user._id;

  const sendResponse = result => {
    res.json({
      status: "success",
      result
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

  User.findByIdAndDelete(userId)
    .then(async () => {
      const removed = { user: true };
      try {
        const removedGoals = await Goals.remove({ userId });
        removed.goals = removedGoals.deletedCount;
        const removedTasks = await Tasks.remove({ userId });
        removed.tasks = removedTasks.deletedCount;
        sendResponse(removed);
      } catch (err) {
        sendError(err);
      }
    })
    .catch(sendError);
};
module.exports = deleteUser;
