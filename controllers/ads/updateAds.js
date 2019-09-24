const Ads = require('../../models/ads.model.js');
const { ValidationError } = require('../../core/error');
const Joi = require('joi');

const updateAds = (req, res) => {
	const adsId = req.params.adsId;

	const schema = Joi.object()
		.keys({
			title: Joi.string()
				.min(3)
				.max(20),
			images: Joi.array(),
			description: Joi.string()
				.min(1)
				.max(500),
			price: Joi.number(),
			phone: Joi.string(),
			category: Joi.number()
		})
		.options({
			stripUnknown: true,
			abortEarly: false
		});

	const result = schema.validate(req.body);

	if (result.error) throw new ValidationError(result.error.message);

	const validData = result.value;

	const sendResponse = ads => {
		res.json({
			status: 'success',
			ads
		});
	};

	const sendError = error => {
		const errMessage = error.message || 'must handle this error on registration';
		res.json({
			status: 'error',
			error: errMessage
		});
	};

	const validDataLength = Object.keys(validData).length;

	if (validDataLength === 0) {
		sendError({ message: 'No valid Fields' });
		return;
	}

	Ads.findByIdAndUpdate(adsId, { $set: validData }, { new: true })
		.then(ads => {
			if (!ads) {
				sendError({ message: 'no such goal' });
				return;
			}
			sendResponse(ads.getPublicFields());
		})
		.catch(err => {
			throw new ValidationError(err.message);
		});
};

module.exports = updateAds;
