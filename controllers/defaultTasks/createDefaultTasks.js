const DefaultTasks = require("../../models/defaultTasks.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const createDefaultTasks = (req, res) => {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20)
        .required(),
      points: Joi.number()
        .min(1)
        .max(500)
        .required(),
      deadline: Joi.string()
        .valid([
          "8.00-10.00",
          "10.00-12.00",
          "12.00-14.00",
          "14.00-16.00",
          "16.00-18.00",
          "18.00-20.00",
          "20.00-22.00",
          "No time"
        ])
        .required(),
      description: Joi.string()
        .min(3)
        .max(500)
    })
    .options({
      stripUnknown: true,
      abortEarly: false
    });

  const result = schema.validate(req.body);

  if (result.error) {
    throw new ValidationError(result.error.message);
  }
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

  const newTask = new DefaultTasks({
    ...validData
  });

  newTask
    .save()
    .then(task => {
      sendResponse(task.getPublicFields());
    })
    .catch(sendError);
};

module.exports = createDefaultTasks;
