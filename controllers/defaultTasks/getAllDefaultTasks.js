const DefaultTasks = require("../../models/defaultTasks.model");
const { ValidationError } = require("../../core/error");

const getAllDefaultTasks = (req, res) => {
  const sendResponse = tasks => {
    res.json({
      status: "success",
      tasks
    });
  };

  DefaultTasks.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
    .then(sendResponse)
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getAllDefaultTasks;
