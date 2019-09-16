const DefaultTasks = require("../../models/defaultTasks.model");

const { ValidationError } = require("../../core/error");

const deleteDefaultTask = (req, res) => {
  const { taskId } = req.params;

  const sendResponse = () => {
    res.json({
      status: "success"
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

  DefaultTasks.findByIdAndDelete(taskId)
    .then(task => {
      if (!task) {
        sendError({ message: "No such task" });
        return;
      }
      sendResponse();
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = deleteDefaultTask;
