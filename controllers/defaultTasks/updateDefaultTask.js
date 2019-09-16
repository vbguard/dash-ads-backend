const DefaultTasks = require("../../models/defaultTasks.model");

const { ValidationError } = require("../../core/error");
const Joi = require("joi");

const updateDefaultTask = (req, res) => {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20),
      points: Joi.number()
        .min(1)
        .max(10000),
      description: Joi.string()
        .min(1)
        .max(500),
      isDone: Joi.boolean(),
      isBlocked: Joi.boolean(),
      deadline: Joi.string().valid([
        "8.00-10.00",
        "10.00-12.00",
        "12.00-14.00",
        "14.00-16.00",
        "16.00-18.00",
        "18.00-20.00",
        "20.00-22.00",
        "No time"
      ])
    })
    .options({
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }

  const { taskId } = req.params;
  const validData = result.value;

  const sendResponse = task => {
    res.json({
      status: "success",
      task
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

  const validDataLength = Object.keys(validData).length;

  if (validDataLength === 0) {
    sendError({ message: "No valid Fields" });
    return;
  }

  DefaultTasks.findByIdAndUpdate(taskId, { $set: validData }, { new: true })
    .then(task => {
      if (!task) {
        sendError({ message: "no such task" });
        return;
      }
      sendResponse(task.getPublicFields());
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = updateDefaultTask;
