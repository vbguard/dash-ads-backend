const Goals = require("../../models/goals.model.js");
const { ValidationError } = require("../../core/error");

const getAllUserGoal = (req, res) => {
  const userId = req.user._id;

  const sendResponse = goals => {
    res.json({
      status: "success",
      goals
    });
  };

  Goals.find({ userId }, { __v: 0, updatedAt: 0, userId: 0 })
    .then(sendResponse)
    .catch(err => {
      throw new ValidationError(err.message);
    });
};

module.exports = getAllUserGoal;
