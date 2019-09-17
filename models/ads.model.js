const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const AdsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		images: [ String ],
		isDone: {
			type: Boolean,
			default: false,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
	},
	{ timestamps: true },
);

AdsSchema.methods.getPublicFields = function() {
	const returnObject = {
		title: this.title,
		images: this.images,
		description: this.description,
		createdAt: this.createdAt,
		_id: this._id,
	};
	return returnObject;
};

// Export the model
module.exports = mongoose.model('Ads', AdsSchema);
