const mongoose = require('mongoose'); // Erase if already required
const mongoosePaginate = require('mongoose-paginate-v2');

// Declare the Schema of the Mongo model
const AdsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			index: true
		},
		description: {
			type: String
		},
		images: [String],
		expDate: {
			type: Date
		},
		isActive: {
			type: Boolean,
			default: true
		},
		category: {
			type: mongoose.Schema.Types.Number,
			ref: 'Categories'
		},
		price: {
			type: Number
		},
		phone: {
			type: String
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users'
		}
	},
	{ timestamps: true }
);

AdsSchema.methods.getPublicFields = function() {
	const returnObject = {
		title: this.title,
		images: this.images,
		description: this.description,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
		expDate: this.expDate,
		category: this.category,
		adsId: this._id,
		price: this.price
	};
	return returnObject;
};

AdsSchema.plugin(mongoosePaginate);

// Export the model
module.exports = mongoose.model('Ads', AdsSchema);
