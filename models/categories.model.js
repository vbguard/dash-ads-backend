const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const CategoriesSchema = new mongoose.Schema(
	{
		category: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			index: true
		}
	},
	{
		timestamps: true
	}
);

CategoriesSchema.methods.getPublicFields = function() {
	const returnObject = {
		category: this.category,
		id: this._id
	};
	return returnObject;
};

// CategoriesSchema.pre("save") = function() {
// 	const returnObject = {
// 		category: this.category,
// 		id: this.id
// 	};
// 	return returnObject;
// };

// Export the model
module.exports = mongoose.model('Categories', CategoriesSchema);
