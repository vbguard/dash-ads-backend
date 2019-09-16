const Goals = require("../../models/goals.model.js");
const User = require("../../models/user.model");
const Joi = require("joi");
const { ValidationError } = require("../../core/error");

const createGoal = async (req, res) => {
  // console.log("createGoal req.user :", req.user);

  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(3)
        .max(20)
        .required(),
      points: Joi.number()
        .min(1)
        .max(10000)
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

  const sendResponse = goal => {
    res.json({
      status: "success",
      goal
    });
  };

  const validData = result.value;

  const newGoal = new Goals({
    userId: req.user._id,
    ...validData
  });

  User.findByIdAndUpdate(req.user._id, { $push: { goals: newGoal._id } })
    .then(updatedUser => {
      if (updatedUser) {
        newGoal
          .save()
          .then(goal => {
            sendResponse(goal.getPublicFields());
          })
          .catch(err => {
            throw new ValidationError(err.message);
          });
      }
    })
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = createGoal;
