const Tasks = require("../../models/tasks.model.js");
const User = require("../../models/user.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const createTask = async (req, res) => {
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

  const { _id } = req.user;
  const validData = result.value;

  const sendResponse = task => {
    res.json({
      status: "success",
      task
    });
  };

  const sendError = error => {
    const errMessage = error.message || "must handle error message";
    res.json({
      status: "error",
      message: errMessage
    });
  };

  const newTask = new Tasks({
    userId: req.user._id,
    ...validData
  });

  User.findByIdAndUpdate(_id, { $push: { tasks: newTask._id } })
    .then(updatedUser => {
      if (!updatedUser) {
        sendError();
        return;
      }

      newTask
        .save()
        .then(task => {
          sendResponse(task.getPublicFields());
        })
        .catch(err => {
          throw new ValidationError(err.message);
        });
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = createTask;
