const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var DefaultTasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
      // unique: true
    },
    description: {
      type: String,
      trim: true
    },
    points: {
      type: Number
    },
    isDone: {
      type: Boolean,
      default: false
    }
    // deadline: {
    //   type: String,
    //   enum: [
    //     "8.00-10.00",
    //     "10.00-12.00",
    //     "12.00-14.00",
    //     "14.00-16.00",
    //     "16.00-18.00",
    //     "18.00-20.00",
    //     "20.00-22.00",
    //     "No time"
    //   ],
    //   required: true
    // },
  },
  { timestamps: true }
);

DefaultTasksSchema.methods.getPublicFields = function() {
  const returnObject = {
    title: this.title,
    description: this.description,
    points: this.points,
    isDone: this.isDone,
    _id: this._id
    // createdAt: this.createdAt,
    // deadline: this.deadline
  };
  return returnObject;
};

//Export the model
module.exports = mongoose.model("DefaultTasks", DefaultTasksSchema);
