const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var TasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    points: {
      type: Number
    },
    isDone: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    },
    deadline: {
      type: String,
      enum: [
        "8.00-10.00",
        "10.00-12.00",
        "12.00-14.00",
        "14.00-16.00",
        "16.00-18.00",
        "18.00-20.00",
        "20.00-22.00",
        "No time"
      ],
      required: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

TasksSchema.methods.getPublicFields = function() {
  const returnObject = {
    title: this.title,
    description: this.description,
    points: this.points,
    isDone: this.isDone,
    createdAt: this.createdAt,
    deadline: this.deadline,
    isBlocked: this.isBlocked,
    _id: this.id
  };
  return returnObject;
};

//Export the model
module.exports = mongoose.model("Tasks", TasksSchema);
