const Ads = require('../../models/ads.model.js');
const User = require('../../models/user.model');
const Joi = require('joi');
const { ValidationError } = require('../../core/error');

const createGoal = async (req, res) => {
	// console.log("createGoal req.user :", req.user);

	const schema = Joi.object()
		.keys({
			title: Joi.string()
				.min(3)
				.max(20)
				.required(),
			images: Joi.array(),
			description: Joi.string()
				.min(3)
				.max(500),
			category: Joi.number().required(),
			exp: Joi.date()
		})
		.options({
			stripUnknown: true,
			abortEarly: false
		});

	const result = schema.validate(req.body);

	if (result.error) throw new ValidationError(result.error.message);

	const sendResponse = ads => {
		res.json({
			status: 'success',
			ads
		});
	};

	const validData = result.value;

	const newAds = new Ads({
		userId: req.user._id,
		...validData
	});

	User.findByIdAndUpdate(req.user._id, { $push: { ads: newAds._id } })
		.then(updatedUser => {
			if (updatedUser)
				newAds
					.save()
					.then(ads => {
						sendResponse(ads.getPublicFields());
					})
					.catch(err => {
						throw new ValidationError(err.message);
					});
		})
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = createGoal;
