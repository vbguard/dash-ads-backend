const Tasks = require("../../models/tasks.model.js");
const { ValidationError } = require("../../core/error");

const getAllUserTasks = (req, res) => {
  const userId = req.user._id;

  const sendResponse = tasks => {
    res.json({
      status: "success",
      tasks
    });
  };

  Tasks.find({ userId }, { __v: 0, updatedAt: 0, userId: 0 })
    .then(sendResponse)
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getAllUserTasks;
