const mongoose = require('mongoose'); // Erase if already required
const mongoosePaginate = require('mongoose-paginate-v2');

// Declare the Schema of the Mongo model
const AdsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
		},
		description: {
			type: String,
		},
		images: [ String ],
		exp: {
			type: Date,
		},
		category: [
			{
				type: mongoose.Schema.Types.Number,
				ref: 'Categories',
			},
		],
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
		exp: this.exp,
		category: this.category,
		adsId: this._id,
	};
	return returnObject;
};

AdsSchema.plugin(mongoosePaginate);

// Export the model
module.exports = mongoose.model('Ads', AdsSchema);
