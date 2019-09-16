const DefaultTasks = require("../../models/defaultTasks.model");

const { ValidationError } = require("../../core/error");

const getDefaultTaskById = (req, res) => {
  const { taskId } = req.params;

  const sendResponse = task => {
    res.json({
      status: "success",
      task
    });
  };

  const sendError = error => {
    const errMessage =
      error.message || "must handle this error on registration";
    res.status(400).json({
      status: "error",
      error: errMessage
    });
  };

  DefaultTasks.findById(taskId, { __v: 0, createdAt: 0, updatedAt: 0 })
    .then(task => {
      if (!task) {
        sendError({ message: "no such task" });
        return;
      }
      sendResponse(task);
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getDefaultTaskById;
