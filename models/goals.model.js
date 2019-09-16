const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var GoalsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    points: {
      type: Number,
      required: true
    },
    isDone: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  },
  { timestamps: true }
);

GoalsSchema.methods.getPublicFields = function() {
  const returnObject = {
    title: this.title,
    description: this.description,
    points: this.points,
    isDone: this.isDone,
    createdAt: this.createdAt,
    _id: this._id
  };
  return returnObject;
};

//Export the model
module.exports = mongoose.model("Goals", GoalsSchema);
